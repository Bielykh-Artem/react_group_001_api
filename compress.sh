ZIP_FILE="./maritime-auth-api.zip"
echo "Compressing for deploy"

rm $ZIP_FILE
zip -r $ZIP_FILE \
    ./app \
    ./dist \
    ./migrations \
    ./*.js \
    ./*.json \
