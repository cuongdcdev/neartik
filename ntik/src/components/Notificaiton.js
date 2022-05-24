import React from "react"
import getConfig from "../config"
// this component gets rendered by App after the form is submitted

export default function Notification(props) {
    const { networkId } = getConfig(process.env.NODE_ENV || 'development')
    const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
    return (
        <aside>
            <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
                 ✔ {props.txt}
            </a>
            {' '}
            {' '}
            <footer>
                <div> Account Id: {window.accountId} | Contract Id: {window.contract.contractId}</div>
                {/* <div>
                    <a target="_blank" rel="noreferrer" href={`${urlPrefix}/transactions/${props.txid}`}>
                        View TxID {props.txid}
                    </a>
                </div> */}
            </footer>
        </aside>
    )
}