import os
import sys
import re

args = sys.argv
path = args[1]
count = args[2]
if((path is not None) and (count is not None)):
    files = os.listdir(path)
    index = 1
    patt = re.compile(r"(\d\d\d).*")
    for item in files:
        r = re.search(patt,item)
        if (r.span() is not None):
            if(index == int(r[1])):
                index +=1
            else:
                print(index)
                index +=1