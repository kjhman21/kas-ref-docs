const fs = require('fs')
const glob = require('glob')
const YAML = require('yaml')
const axios = require('axios');

async function genDocs() {
  var docs = [];

  await glob("./public/docs/**/*.yaml", function(err, matches) {
    matches.map(x=>{
      var sp = x.split('/');
      filepath = "/"+sp.splice(2).join('/');
      sp = x.split('/');
      targetPath = "/"+sp.splice(3).join('/').split('.')[0];
      var yaml = YAML.parse(fs.readFileSync(x, "utf8"))
      sp = x.split('/');
      title = yaml.info.title
      version = sp[sp.length-1].split('.')[0]
      lang = sp[3];
      api = sp[4];
      docs.push({filepath, targetPath, title, version, lang, api})
    })

    fs.writeFileSync('src/docs.json', JSON.stringify(docs))
  })

  const javadocUrl = "https://javadoc.io/typeahead/version_ids?groupId=xyz.groundx.caver&artifactId=caver-java-ext-kas"
  axios.get(javadocUrl).then(res=>{
    const javaDocVersions = res.data;
    var latestVersion = "";
    var latestAndroidVersion = "";
    javaDocVersions.forEach((v)=>{
      if(v.indexOf("rc") == -1) {
        if(v.indexOf("android") >= 0) {
          latestAndroidVersion = v;
        } else {
          latestVersion = v;
        }
      }
    })
    javaDocVersions.push("latest");

    var docs = {
      versions: javaDocVersions,
      latestAndroidVersion,
      latestVersion
    }

    fs.writeFileSync('src/java.json', JSON.stringify(docs))
  })

  const jsTagUrl = "https://api.github.com/repos/ground-x/caver-js-ext-kas/tags"
  axios.get(jsTagUrl).then(res=>{
    const versions = ["latest"];
    var latestVersion = "";

    for(var i = 0; i < res.data.length; i++) {
      const x = res.data[i];
      if(x.name == "v1.0.0") break;
      if(latestVersion.length == 0 && x.name.indexOf("rc") < 0 ) {
        latestVersion = x.name
      }
      versions.push(x.name)
    }

    var docs = {
      versions,
      latestVersion
    }

    fs.writeFileSync('src/js.json', JSON.stringify(docs))
  })

}

genDocs()