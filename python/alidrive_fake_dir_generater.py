import os
import re
base_path = 'f:\\下载\阿里补充\\'
def get_all_files():
    filenames = []
    for filename in os.listdir(base_path):
        filenames.append(filename)
    return filenames

def read_file(path):
    f = open(path, encoding="utf-8")
    lines = f.readlines()
    f.close()
    return lines 

def check_parent_dir_exist(path):
    _path = path.replace("\n", "")
    _dir = _path.split('>')
    for i in range(len(_dir)):
        if _dir[i] == '':
            continue
        else:
            _check_path = base_path+"\\".join(_dir[0:i])
            _is_exist = os.path.exists(_check_path)
            if not _is_exist:
                os.makedirs(_check_path) 
def is_file(filename):
    return re.search("^.*\.[a-zA-Z0-9]+$", filename)
def create_file(file_path):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    _f = open( file_path,"w")
    _f.close()
def handle(lines):
    _t = lines[0].replace("\n","")
    root_path = base_path + _t.replace(">","\\")
    for index in range(len(lines)):
        _file = lines[index].replace('\n','')
        if index == 0:
            check_parent_dir_exist(_file)
        else:
            if is_file(_file):
                print(root_path+_file)
                create_file(root_path+_file)
            else:
                print(root_path+_file)
                os.makedirs(root_path+_file) 

def main():
    filenames = get_all_files()
    
    for name in filenames:
        _path = os.path.join(base_path,name)
        _lines = read_file(_path)
        handle(_lines)

main()

