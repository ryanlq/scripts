import sys
import os
import json

missfiles = []
argv = sys.argv
if(len(argv) == 3):
    json_path = argv[1]
    dest_folder_path = argv[2]
    if(os.path.exists(json_path) == True and os.path.exists(dest_folder_path) == True ):
        f = open(json_path,encoding='utf-8')
        filenames = json.load(f)
        index = 1
        for filename in filenames['result']:
            src_path = os.path.join(dest_folder_path,filename['href'])
            filetype = filename['href'].split('.')[1] 
            if(os.path.exists(os.path.join(src_path))==True):
                dest_path = os.path.join(dest_folder_path,filename['title'].replace(' ','_')+filetype)
                os.rename(src_path, dest_path)
            else:
                missfiles.append(index)
            index += 1 
        f.close()
print("修改成功！")
print("缺失集数：")
print(missfiles)
        