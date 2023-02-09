import json
import os
import re
import traceback
import urllib.request

import easygui
import faker


class Music:
    """
    单曲信息。
    """

    _: str = ''
    album: str = ''
    id: int = 0
    mid: str = ''
    name: str = ''
    singer: str = ''
    url: str = ''
    vip: bool = False

    def __init__(self, name: str, singer: str, album: str, id: int, _: str, vip: bool = False, mid: str = '') -> None:
        self.name = name
        self.singer = singer
        self.album = album
        self.id = id
        self._ = _
        self.url = f'https://music.163.com/#/song?id={id}'
        self.link = f'https://music.163.com/song/media/outer/url?id={id}.mp3'
        self.vip = vip
        self.mid = mid


def get(url: str, headers: dict = {}, retry: int = 3) -> bytes:
    if not retry:
        traceback.print_exc()
        print('无法访问 '+url)
    headers['User-Agent'] = faker.Faker().user_agent()
    req = urllib.request.Request(url, headers=headers)
    try:
        return urllib.request.urlopen(req).read()
    except:
        return get(url, headers, retry-1)


def get_json(url: str, headers: dict = {}):
    data = get(url, headers)
    return json.loads(data.decode(errors='ignore'))


def get_lrc(music: Music) -> str:
    print('正在获取歌词……')
    try:
        data = get_json(
            f'http://music.163.com/api/song/media?id={music.id}')
        return data['lyric'] if 'lyric' in data else ''

    except Exception as e:
        traceback.print_exc()
        print('获取歌词失败:'+str(e))


music_u = '2b8a5ddf40143c72a90cb15f5481dc72457f971fe8577b32d88ebf2e1b596fc71e8907c67206e1ed43c56e3793619a1e4b499407907e6d3d0b7c7ef19c87988505ea72aa0f9368713058a731ea016156'


def getsongs():
    print('正在获取歌单……')
    while True:
        if music_u:
            data = get_json(
                f'https://music.163.com/api/playlist/detail?id={id}', {'cookie': 'MUSIC_U='+music_u})
        else:
            data = get_json(
                f'https://music.163.com/api/playlist/detail?id={id}')
        if 'result' in data:
            break
        else:
            print(data)
    return [Music(i['name'], ','.join(
        j['name'] for j in i['artists']), i['album']['name'], i['id'], 'netease') for i in data['result']['tracks']]


while True:
    id = easygui.enterbox('请输入网易云音乐歌单ID', '下载歌单')
    if id:
        songs = getsongs()
        if len(songs) == 10:
            if not music_u:
                music_u = easygui.enterbox(
                    '获取完整歌单需要输入登陆网页版后的cookie\n请粘贴 MUSIC_U 到下方(若不知如何查看可留空)', '未登录只能下载前10首')
                if music_u:
                    songs = getsongs()
        ch = easygui.multchoicebox('请选择需要下载的歌曲', '下载歌单', [
                                   i.name for i in songs])
        t = []
        for i in songs:
            if i.name in ch:
                t.append(i)
        songs = t
        if songs:
            mode = easygui.buttonbox(
                '请选择下载模式', '下载模式', ('仅 MP3', 'MP3 和 LRC', '仅 LRC'))
            savepath = easygui.diropenbox('请选择保存文件夹')
            fail_num = 0
            for num, i in enumerate(songs):
                success = False
                filepath = os.path.join(savepath, re.sub(
                    r'[\/\\\:\*\?\"\<\>\|]', '_',  i.singer+' - '+i.name+'.mp3'))
                if 'MP3' in mode:
                    for times in range(3):
                        print(
                            f'正在下载歌曲({num+1}/{len(songs)}'+(f'，重试{times}次' if times else '')+f'，失败{fail_num}首)……')
                        open(filepath, 'wb').write(get(i.link))
                        if len(open(filepath, 'rb').read()) > 1e5:
                            success = True
                            break
                if success or 'MP3' not in mode:
                    if 'LRC' in mode:
                        lrc = lrc(i)
                        if lrc:
                            open(filepath[:-3]+'lrc',
                                 'wb').write(lrc(i).encode(errors='ignore'))
                else:
                    os.remove(filepath)
                    fail_num += 1
            easygui.msgbox(
                f'成功{len(songs)-fail_num}首，失败{fail_num}首。', '下载歌单完毕')