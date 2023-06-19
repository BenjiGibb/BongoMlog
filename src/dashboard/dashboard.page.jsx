import axios from "axios";

export default function Dashboard() {

    axios.get('http://localhost:8080/user').then((res) => {
        console.log(res)
    })

    return (
        <>
        <h1>Bongo-Mlog</h1>
            <h2>Dein lieblings Blog!</h2>
            <div id="entries">
                <div id="entry">

                </div>
            </div>
        </>
    );
}
