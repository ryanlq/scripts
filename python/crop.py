# ffmpeg -i .\003[第21-30章].m4a -ss 00:00:12 -c copy 003[第21-30章]_.m4a
#
#  python F:\项目\001_脚本\python\crop.py 00:00:31
import os
import subprocess
import re
import sys

path = './'

start_time = sys.argv[1]

for parent, dirnames, filenames in os.walk(path):
    for filename in filenames:
        old_dir = os.path.join(parent, filename)
        new_dir = os.path.join(parent,"output", filename)

        an = re.search('^.*.m4a$', old_dir)
        if an:
            print ('匹配：'+old_dir)
            os.system("ffmpeg -i "+old_dir +" -ss "+ start_time +" -c copy "+new_dir )
