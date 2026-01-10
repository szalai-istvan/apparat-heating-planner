import os
check = {'fileDuplications': True, 'functionDuplications': True, 'classDuplications': True}

PROJECT_SPECIFIC = ' --- PROJECT SPECIFIC'
PRINT_PROJECT_SPECIFIC = False

cwd = os.getcwd()
jsFiles = []
for root, subdirs, files in os.walk(cwd):
    for file in files:
        fullPath = os.path.join(root, file)
        relativePath = fullPath.replace(cwd, '')[1:].replace('\\', '/')
        if fullPath[-3:] == '.js':
            jsFiles.append(relativePath)

def firstLineContainsProjectSpecific(filePath):
    with open(filePath, encoding="utf8") as fileContent:
        for line in fileContent:
            if 'project-specific' in line.lower() or 'project_specific' in line.lower():
                if 'class' not in line and 'function' not in line:
                    return True
            return False

if check['fileDuplications']:
    fileNameMap = {}
    for jsf in jsFiles:
        projectSpecificFile = firstLineContainsProjectSpecific(jsf)
        fileName = jsf.split('/')
        fileName = fileName[len(fileName) - 1]

        jsf = jsf + PROJECT_SPECIFIC if projectSpecificFile else jsf
        if fileName in fileNameMap:
            fileNameMap[fileName].append(jsf)
        else:
            fileNameMap[fileName] = [jsf]

    print('\nFile duplications:')
    for key in fileNameMap.keys():
        value = fileNameMap[key]
        if len(value) > 1 and (PRINT_PROJECT_SPECIFIC or len([v for v in value if PROJECT_SPECIFIC not in v]) > 0):
            print(key)
            for v in value:
                print(f' - {v}')

if check['functionDuplications']:
    functionMap = {}
    for jsf in jsFiles:
        with open(jsf, encoding="utf8") as fileContent:
            for line in fileContent:
                if line[0:8] == 'function':
                    projectSpecificFunction = 'project-specific' in line.lower() or 'project_specific' in line.lower()
                    end = line.index('(')
                    functionName = line[9:end]
                    jsf = jsf + PROJECT_SPECIFIC if projectSpecificFunction else jsf
                    if functionName in functionMap:
                        functionMap[functionName].append(jsf)
                    else:
                        functionMap[functionName] = [jsf]

    print('\nFunction duplications:')
    for key in functionMap.keys():
        value = functionMap[key]
        if len(value) > 1 and (PRINT_PROJECT_SPECIFIC or len([v for v in value if PROJECT_SPECIFIC not in v]) > 0):
            print(key)
            for v in value:
                print(f' - {v}')

if check['classDuplications']:
    classMap = {}
    for jsf in jsFiles:
        with open(jsf, encoding="utf8") as fileContent:
            for line in fileContent:
                if line[0:5] == 'class':
                    projectSpecificClass = 'project-specific' in line.lower() or 'project_specific' in line.lower()
                    end = line.index(' {')
                    className = line[6:end]
                    jsf = jsf + PROJECT_SPECIFIC if projectSpecificClass else jsf
                    if className in classMap:
                        classMap[className].append(jsf)
                    else:
                        classMap[className] = [jsf]

    print('\nClass duplications:')
    for key in classMap.keys():
        value = classMap[key]
        if len(value) > 1 and (PRINT_PROJECT_SPECIFIC or len([v for v in value if PROJECT_SPECIFIC not in v]) > 0):
            print(key)
            for v in value:
                print(f' - {v}')