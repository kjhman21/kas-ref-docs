import { withRouter } from 'react-router-dom';
import KasDocsNavBar from '../../components/Navbar'
import versions from '../../js.json'

const CaverJsPage = (props) => {
    var version = props.match.params.version;
    if(!version || version === 'latest') {
        version = versions.latestVersion;
    }
    const url = `https://refs.klaytnapi.com/en/sdk/js/${version}/index.html`
    return (
        <>
            <KasDocsNavBar {...props} currentAPITitle='API References' currentSDKTitle='KAS SDK (Javascript)' />
            <div style={{marginTop:"56px"}}>
                <iframe title='caver-js-page' style={{display:'block', width:'100vw', height:'calc(100vh - 56px)'}} src={url} />
            </div>
        </>
    )
}

export default withRouter(CaverJsPage);