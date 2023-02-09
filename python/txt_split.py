# -*- coding: utf-8 -*-
import os

import re
import jieba
import jieba.posseg as pseg
jieba.enable_paddle()# 启动paddle模式。 0.40版之后开始支持，早期版本不支持

os.chdir(r'F:\项目\001_脚本\python\txt')

f = open("瓦尔登湖.txt", mode="r",encoding='utf-8')
results = {}
def analyst(lists):

    for content in lists:
        if content != '\n':
            key = ''
            relavants = []
            seg_list = pseg.cut(content,use_paddle=True)  # 默认是精确模式
            for word, flag in seg_list:
                if(key == '' and flag == 'n' ): 
                    key = word
                if(flag == 'v'):
                    relavants.append(word)
            if (len(relavants)>0 and key != ''):
                results[key] = relavants
    #           
    #     print(result_list)

for line in f:
    result_list = re.split(r'[，；。！]', line)
    analyst(result_list)
print(results)




# result_list = re.split(r'(?:！[，。])', text)
# print(result_list)