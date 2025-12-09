import os
check = {'fileDuplications': False, 'functionDuplications': False, 'classDuplications': True}

cwd = os.getcwd()
jsFiles = []
for root, subdirs, files in os.walk(cwd):
    for file in files:
        fullPath = os.path.join(root, file)
        relativePath = fullPath.replace(cwd, '')[1:].replace('\\', '/')
        if fullPath[-3:] == '.js':
            jsFiles.append(relativePath)

if check['fileDuplications']:
    fileNameMap = {}
    for jsf in jsFiles:
        fileName = jsf.split('/')
        fileName = fileName[len(fileName) - 1]
        
        if fileName in fileNameMap:
            fileNameMap[fileName].append(jsf)
        else:
            fileNameMap[fileName] = [jsf]

    for key in fileNameMap.keys():
        value = fileNameMap[key]
        if len(value) > 1:
            print(key)
            for v in value:
                print(f' - {v}')

if check['functionDuplications']:
    functionMap = {}
    for jsf in jsFiles:
        with open(jsf, encoding="utf8") as fileContent:
            for line in fileContent:
                if line[0:8] == 'function':
                    end = line.index('(')
                    functionName = line[9:end]
                    if functionName in functionMap:
                        functionMap[functionName].append(jsf)
                    else:
                        functionMap[functionName] = [jsf]

    for key in functionMap.keys():
        value = functionMap[key]
        if len(value) > 1:
            print(key)
            for v in value:
                print(f' - {v}')

if check['classDuplications']:
    classMap = {}
    for jsf in jsFiles:
        with open(jsf, encoding="utf8") as fileContent:
            for line in fileContent:
                if line[0:5] == 'class':
                    end = line.index(' {')
                    className = line[6:end]
                    if className in classMap:
                        classMap[className].append(jsf)
                    else:
                        classMap[className] = [jsf]

    for key in classMap.keys():
        value = classMap[key]
        if len(value) > 1:
            print(key)
            for v in value:
                print(f' - {v}')