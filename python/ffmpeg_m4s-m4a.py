

import os
import subprocess
import re

path = './'


for parent, dirnames, filenames in os.walk(path):
    for filename in filenames:
        old_dir = os.path.join(parent, filename)

        str = ".m4s"


        an = re.search('^.*.m4s$', old_dir)
        if an:
            print ('匹配：'+old_dir)
            os.system("ffmpeg -i "+old_dir +" -codec copy "+old_dir+".m4a" + " -threads 4 -preset ultrafast ")

        bn = re.search('^.*.mp4$', old_dir)
        if bn:
            print ('匹配：'+old_dir)
            os.system("ffmpeg -i "+old_dir +" -vn -y -codec copy "+old_dir+".m4a" + " -threads 4 -preset ultrafast ")
