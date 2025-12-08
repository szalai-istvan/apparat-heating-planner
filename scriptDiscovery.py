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
                jsFiles.append(fullPath)
    return jsFiles

def fileBelongsToProjects(relativePath, projects):
    for p in projects:
        print(f'project={relativePath.split('/')[0]}')
        if p == relativePath.split('/')[0]:
            return True
    return False

def readHtmlContent(file):
    lines = []
    with open(file) as apparat:
        for line in apparat:
            indexLines.append(line)
            if STOP_SIGN in line:
                break
    return lines

def getFullHtmlContent(htmlContent, jsFiles):
    lastDir = ''
    rows = []
    p5Rows = []

    for jsFile in jsFiles:
        directory = jsFile.split('/')[DISCRIMINATOR_PATH_PART]
        print(f'{directory=}')
        if directory != lastDir:
            rows.append(EMPTY_STRING)
        lastDir = directory

        if P5 not in jsFile:
            rows.append(FOUR_SPACES + createScriptTag(jsFile))
        else:
            p5Rows.append(FOUR_SPACES + createScriptTag(jsFile))
    
    allRows = []
    [allRows.append(row) for row in htmlContent]
    [allRows.append(row) for row in rows]
    allRows.append(EMPTY_STRING)
    [allRows.append(row) for row in p5Rows]
    allRows = [row + '\n' for row in allRows]
    
    allRows.append('</body>\n')
    allRows.append('\n')
    allRows.append('</html>\n')

    return ''.join(allRows)

def createScriptTag(path):
    return SCRIPT_TAG_TEMPLATE.replace(SRC, path)

files = list(HTML_FILE_PROJECT_MAPPING.keys())
for f in files:
    addScriptsToFile(f)
print('✅ Scripts updated in apparat.html')