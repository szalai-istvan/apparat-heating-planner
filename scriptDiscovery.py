import projectSizeCalculator
import os

SCRIPT_TAG_TEMPLATE = '<script type="text/javascript" src="$src"></script>'
SRC = '$src'
JS = '.js'
VERSION4 = 'v4'
DISCRIMINATOR_PATH_PART = 2

def createScriptTag(path):
    return SCRIPT_TAG_TEMPLATE.replace(SRC, path)

cwd = os.getcwd()

jsFiles = []
for root, subdirs, files in os.walk(cwd):
    for file in files:
        fullPath = os.path.join(root, file)
        if fullPath[-3:] == JS and VERSION4 in fullPath:
            jsFiles.append(fullPath)

jsFiles = [jsf.replace(cwd, '')[1:].replace('\\', '/') for jsf in jsFiles]
scriptTags = [createScriptTag(jsf) for jsf in jsFiles]

rows = []
p5Rows = []
lastDir = 'appdata'
for jsFile in jsFiles:
    directory = jsFile.split('/')[DISCRIMINATOR_PATH_PART]
    if directory != lastDir:
        rows.append('')
    lastDir = directory

    if 'p5' not in jsFile:
        rows.append('    ' + createScriptTag(jsFile))
    else:
        p5Rows.append('    ' + createScriptTag(jsFile))

rows.append('')
[rows.append(r) for r in p5Rows]
rows = [r + '\n' for r in rows]

indexLines = []
stop = '<!-- scripts -->'
with open('apparat.html') as apparat:
    for line in apparat:
        indexLines.append(line)
        if stop in line:
            break

for row in rows:
    indexLines.append(row)

indexLines.append('</body>\n')
indexLines.append('\n')
indexLines.append('</html>\n')

with open('apparat.html', 'w') as apparat:
    apparat.write(''.join(indexLines))

print('✅ Scripts updated in apparat.html')
projectSizeCalculator.calculateProjectSize()