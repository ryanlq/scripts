import os
import re
import shutil
base_path = "F:\\下载\\替嫁医妃\\"
des_dir = "F:\\下载\\new_替嫁医妃\\"

def get_all_files():
    filenames = []
    for filename in os.listdir(base_path):
        filenames.append(filename)
    return filenames

def is_folder(path):
    return os.path.isdir(path)

def rename_file(filename,path):
    list = os.listdir(path)
    origins = list[0].split(".")
    new_path = path+"\\"+filename+"."+origins[1]
    os.rename(path+"\\"+list[0],new_path)
    dst = shutil.move(new_path, des_dir)
    shutil.rmtree(path)
    print("[ok] "+ path)

def main():
    items = get_all_files()
    for item in items:
        item_path = base_path+"\\"+item
        if is_folder(item_path):
            rename_file(item,item_path)
    print("done")
main()