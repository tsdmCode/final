# $1 er navnet på component $2 er tsx eller jsx $3 er om du vil have "components" eller "pages"
echo "Creating new folder"
cd src/$3/

mkdir $1
cd $1

touch $1.$2
printf "import style from \"./${1,,}.module.scss\";\n\nexport default function $1() {\n  return (<div className={style.${1,,}Style}></div>)\n};" > $1.$2

touch ${1,,}.module.scss
printf ".${1,,}Style {\n\n}" > ${1,,}.module.scss

cd ../..
echo "Done creating $1 folder"

