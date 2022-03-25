export default function ExternalPage(props: {blob: string}){
    return(
        <>
            <img id="top-right-blob-events" src={props.blob}/>
            <img id="bottom-left-blob-events" src={props.blob}/>
        </>
    );
}