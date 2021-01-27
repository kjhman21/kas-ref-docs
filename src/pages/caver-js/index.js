import { withRouter } from 'react-router-dom';
import KasDocsNavBar from '../../components/Navbar'

const CaverJsPage = (props) => {
    return (
        <>
            <KasDocsNavBar {...props} currentAPITitle='API References' currentSDKTitle='KAS SDK (Javascript)' />
            <div style={{marginTop:"56px"}}>
                <iframe title='caver-js-page' style={{display:'block', width:'100vw', height:'calc(100vh - 56px)'}} src="https://refs.klaytnapi.com/en/sdk/js/latest/index.html" />
            </div>
        </>
    )
}

export default withRouter(CaverJsPage);