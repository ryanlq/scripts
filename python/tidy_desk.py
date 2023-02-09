import os
import getpass
import shutil

username = getpass.getuser()

base_folder = 'C:\\Users\\{}'.format(username)
doc_folder = os.path.join(base_folder,"Documents","桌面","文档")
plaintext_folder = os.path.join(base_folder,"Documents","桌面","文本")
Pictures_folder = os.path.join(base_folder,"Pictures","桌面")
Links_folder = os.path.join(base_folder,"Links")
Other_folder = os.path.join(base_folder,"其他")
Video_folder = os.path.join(base_folder,"Video","桌面")
Music_folder = os.path.join(base_folder,"Music","桌面")


doc_exts = ['doc','docx','xls','xlsx']
plaintext_exts = ['txt','md']
link_exts = ['lnk','bat','exe']
image_exts = ['png','jpg','jpeg','gif']
music_etxs = ['mp3','wav','wmv','m4a','m4s']
video_etxs = ['mp4','mkv','rmvb','mu38']
ignore_etxs = ['ini']

ignore_links = ['文本.lnk','文档.lnk','链接.lnk','图片.lnk','其他.lnk','音乐.lnk','视频.lnk']


def move_file(src_path,dst_folder,fullfilename):
    print(src_path,dst_folder,fullfilename)
    dst_path = os.path.join(dst_folder,fullfilename)
    if((fullfilename is not None)  and (os.path.exists(dst_path) == True)):
        file_name, file_ext = os.path.splitext(fullfilename)
        shutil.move(src_path,os.path.join(dst_folder,file_name+'_new'+file_ext))  
        print("sucess to ["+src_path + "] to [" +os.path.join(dst_folder,file_name+'_new'+file_ext)+"]")
    else:
        shutil.move(src_path,os.path.join(dst_folder,fullfilename)) 
        print("sucess to ["+src_path + "] to [" +os.path.join(dst_folder,fullfilename)+"]")


def walk_folder(path):
    list = os.listdir(path)
    parent_path, dirname = os.path.split(path)
    for item in list:
        _path = os.path.join(path,item)
        file_name, file_ext = os.path.splitext(item)
        file_ext = file_ext.replace('.', '')

        try:
            if ((str(item) in ignore_links)  == True):
                break 
            elif ((file_ext in doc_exts) == True):# 文档
                move_file(_path,doc_folder,item)    
            elif (file_ext in plaintext_exts  == True): # 文本
                move_file(_path,plaintext_folder,item)  
            elif ((file_ext in link_exts)  is True): # 链接
                move_file(_path,Links_folder,item)
            elif ((file_ext in image_exts)  is True):# 图片
                move_file(_path,Pictures_folder,item)

            elif ((file_ext in music_etxs)  == True):# 音乐
                move_file(_path,Music_folder,item)  
            elif ((file_ext in video_etxs)  == True):# 视频
                move_file(_path,Video_folder,item)  
            else :
                move_file(_path,Other_folder,item)  


        finally :
            print('Failed to move the file of '+item)

def main():
    desktop_base_path = os.path.join("C:\\","Users", username, "Desktop")  # desktop path
    walk_folder(desktop_base_path)

main()