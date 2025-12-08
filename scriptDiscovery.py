import projectSizeCalculator
import os

SRC = '$src'
SCRIPT_TAG_TEMPLATE = f'<script type="text/javascript" src="{SRC}"></script>'
JS = '.js'
DISCRIMINATOR_PATH_PART = 2
STOP_SIGN = '<!-- scripts -->'
FOUR_SPACES = '    '
EMPTY_STRING = ''
P5 = 'p5'


HTML_FILE_PROJECT_MAPPING = {
    'heating-planner.html': ['common', 'heating-planner'],
    'slab-heating-planner.html': ['common', 'slab-heating-planner']
}


def addScriptsToFile(file):
    jsFiles = getJsFilesForFile(file)
    htmlContent = readHtmlContent(file)
    htmlContent = getFullHtmlContent(htmlContent, jsFiles)
    
    with open(file, 'w') as apparat:
        apparat.write(htmlContent)

def getJsFilesForFile(file):
    projects = HTML_FILE_PROJECT_MAPPING[file]
    cwd = os.getcwd()

    jsFiles = []
    for root, subdirs, files in os.walk(cwd):
        for file in files:
            fullPath = os.path.join(root, file)
            relativePath = fullPath.replace(cwd, '')[1:].replace('\\', '/')
            if fullPath[-3:] == JS and fileBelongsToProjects(relativePath, projects):
                jsFiles.append(relativePath)
    return jsFiles

def fileBelongsToProjects(relativePath, projects):
    for p in projects:
        if p == relativePath.split('/')[1]:
            return True
    return False

def readHtmlContent(file):
    lines = []
    with open(file) as apparat:
        for line in apparat:
            lines.append(line)
            if STOP_SIGN in line:
                break
    return lines

def getFullHtmlContent(htmlContent, jsFiles):
    lastDir = ''
    rows = []
    p5Rows = []

    for jsFile in jsFiles:
        directory = jsFile.split('/')[DISCRIMINATOR_PATH_PART]
        if directory != lastDir:
            rows.append(EMPTY_STRING + '\n')
        lastDir = directory

        if P5 not in jsFile:
            rows.append(FOUR_SPACES + createScriptTag(jsFile) + '\n')
        else:
            p5Rows.append(FOUR_SPACES + createScriptTag(jsFile) + '\n')
    
    allRows = []
    [allRows.append(row) for row in htmlContent]
    [allRows.append(row) for row in rows]
    allRows.append(EMPTY_STRING + '\n')
    [allRows.append(row) for row in p5Rows]
    
    allRows.append('</body>\n')
    allRows.append('\n')
    allRows.append('</html>\n')

    return ''.join(allRows)

def createScriptTag(path):
    return SCRIPT_TAG_TEMPLATE.replace(SRC, path)

def getProjectData(project):
    cwd = os.getcwd()
    lineCounter = 0
    fileCounter = 0
    for root, subdirs, files in os.walk(cwd):
        for file in files:
            fullPath = os.path.join(root, file)
            relativePath = fullPath.replace(cwd, '')[1:].replace('\\', '/')
            if not fullPath[-3:] == JS or not fileBelongsToProjects(relativePath, [project]):
                continue
            fileCounter += 1
            with open(fullPath, encoding="utf8") as scriptFile:
                for line in scriptFile:
                    if isNotComment(line):
                        lineCounter += 1
    
    return (project, fileCounter, lineCounter)

def isNotComment(line):
    line = line.strip()

    if len(line) == 0:
        return True
    if line[0:2] == '//':
        return False
    if line[0] == '*':
        return False
    if line[0:3] == '/**':
        return False
    return True

def formatAndPrintProjectData(projects):
    projectData = [getProjectData(p) for p in projects]
    projectData.append(('summary', sum(list([p[1] for p in projectData])), sum(list([p[2] for p in projectData]))))
    projectNames = [p[0] for p in projectData]
    projectFileCounts = [p[1] for p in projectData]
    projectLineCounts = [p[2] for p in projectData]

    maxProjectLength = max([len(pn) for pn in projectNames])
    projectNames = [pn + ' ' * (maxProjectLength + 4 - len(pn)) for pn in projectNames]

    projectFileCounts = [f'{pfc:_} files'.replace('_', ' ') for pfc in projectFileCounts]
    maxProjectFileCountsLength = max([len(pfc) for pfc in projectFileCounts])
    projectFileCounts = [' ' * (maxProjectFileCountsLength + 4 - len(pfc)) + pfc for pfc in projectFileCounts]

    projectLineCounts = [f'{plc:_} lines'.replace('_', ' ') for plc in projectLineCounts]
    maxProjectLineCountsLength = max([len(plc) for plc in projectLineCounts])
    projectLineCounts = [' ' * (maxProjectLineCountsLength + 4 - len(plc)) + plc for plc in projectLineCounts]

    print('\n🎯 Project brief summary:')
    print('+' + '-'*len(projectNames[0]) + '+' + '-'*len(projectFileCounts[0]) + '+' + '-'*len(projectLineCounts[0]) + '+')
    for i in range(len(projectNames)):
        print(f'|{projectNames[i]}|{projectFileCounts[i]}|{projectLineCounts[i]}|')
    print('+' + '-'*len(projectNames[0]) + '+' + '-'*len(projectFileCounts[0]) + '+' + '-'*len(projectLineCounts[0]) + '+')

def process():
    files = list(HTML_FILE_PROJECT_MAPPING.keys())
    projects = []
    for f in files:
        addScriptsToFile(f)
        print(f'✅ Scripts updated in {f}')

        for p in HTML_FILE_PROJECT_MAPPING[f]:
            projects.append(p)

    projects = set(projects)
    formatAndPrintProjectData(projects)

process()
