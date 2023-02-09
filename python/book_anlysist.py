# encoding=utf-8
import jieba
import jieba.posseg as pseg
# 标签	含义
# n	    普通名词
# nr	人名
# nz	其他专名
# a	    形容词
# m	    数量词
# c	    连词
# PER	人名
# f	    方位名词
# ns	地名
# v	    普通动词
# ad	副形词
# q	    量词
# u	    助词
# LOC	地名
# s	    处所名词
# nt	机构名
# vd	动副词
# an	名形词
# r	    代词
# xc	其他虚词
# ORG	机构名
# s	    处所名词
# nt	机构名
# vd	动副词
# an	名形词
# r	    代词
# xc	其他虚词
# ORG	机构名

jieba.enable_paddle()# 启动paddle模式。 0.40版之后开始支持，早期版本不支持
# strs=["我来到北京清华大学","乒乓球拍卖完了","中国科学技术大学"]
# for str in strs:
#     seg_list = jieba.cut(str,use_paddle=True) # 使用paddle模式
#     print("Paddle Mode: " + '/'.join(list(seg_list)))

# seg_list = jieba.cut("我来到北京清华大学", cut_all=True)
# print("Full Mode: " + "/ ".join(seg_list))  # 全模式

# seg_list = jieba.cut("我来到北京清华大学", cut_all=False)
# print("Default Mode: " + "/ ".join(seg_list))  # 精确模式

# seg_list = jieba.cut("他来到了网易杭研大厦")  # 默认是精确模式
# print(", ".join(seg_list))

# seg_list = jieba.cut_for_search("小明硕士毕业于中国科学院计算所，后在日本京都大学深造")  # 搜索引擎模式
# print(", ".join(seg_list))

seg_list = pseg.cut("渐近故乡时，天气又阴晦了，冷风吹进船舱中，呜呜的响，从蓬隙向外一望，苍黄的天底下，远近横着几个萧索的荒村，没有一些活气。我的心禁不住悲凉起来了。",use_paddle=True)  # 默认是精确模式
for word, flag in seg_list:
    print('%s %s' % (word, flag))

# seg_list = pseg.lcut("渐近故乡时，天气又阴晦了，冷风吹进船舱中，呜呜的响，从蓬隙向外一望，苍黄的天底下，远近横着几个萧索的荒村，没有一些活气。我的心禁不住悲凉起来了。")  # 默认是精确模式

# print(seg_list)