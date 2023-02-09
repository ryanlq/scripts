from ltp import LTP

relavants = {
    "SBV":"主谓关系",
    "VOB":"直接宾语",
    "IOB":"间接宾语",
    "FOB":"前置宾语",
    "DBL":"兼语",
    "ATT":"定中关系",
    "ADV":"状中结构",
    "CMP":"动补结构",
    "COO":"并列关系",
    "POB":"介宾关系",
    "LAD":"左附加关系",
    "RAD":"右附加关系",
    "IS":"独立结构",
    "HED":"核心关系",
    "WP":"，。！"
}

ltp = LTP()

result1 = ltp.pipeline(["昏暗的灯光。"], tasks = ["cws","dep","sdp"])
result2 = ltp.pipeline(["太阳红彤彤的。"], tasks = ["cws","dep","sdp"])

dep_labels = result1["dep"][0]["label"]
dep_labels2 = result2["dep"][0]["label"]
labels = []
labels2 = []
for label in dep_labels:
    print(label)
    labels.append(relavants[label])
for label in dep_labels2:
    print(label)
    labels2.append(relavants[label])
print(labels)
print(labels2)
#print(result1)
