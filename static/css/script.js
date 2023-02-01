class Tabledata {

    constructor(similarity,title ,url) {
      this.similarity = similarity;
      this.title = title;
      this.url=url; 
    }
    build() {
        if(this.title.length>100){
            return `<tr><td style="padding:2px;font-family: 'Dancing Script', cursive;
                            font-family: 'Island Moments', cursive;
                            font-family: 'Kalam', cursive;
                            font-family: 'Marhey', cursive;
                            ">`+this.title.substring(0,Math.min(100, this.title.length))+` ... </td>
                <td style="padding:2px;font-family: 'Dancing Script', cursive;
                            font-family: 'Island Moments', cursive;
                            font-family: 'Kalam', cursive;
                            font-family: 'Marhey', cursive;">`+this.similarity+`</td>
                <td style="padding:2px;font-family: 'Dancing Script', cursive;
                            font-family: 'Island Moments', cursive;
                            font-family: 'Kalam', cursive;
                            font-family: 'Marhey', cursive;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            ">
                            <button style="
                                background: var(--accent-clr);
                                color: var(--light-clr);
                                padding: 15px 30px;
                                border: none;
                                outline: none;
                                border-radius: 25px;
                                cursor: pointer;
                                font-size: 1.0125rem;"
                                type="button" data-toggle="modal" data-target="#myModal" 
                                id=${this.url} > View </button>
                </td>`
        }
        return `<tr><td style="padding:2px;font-family: 'Dancing Script', cursive;
                            font-family: 'Island Moments', cursive;
                            font-family: 'Kalam', cursive;
                            font-family: 'Marhey', cursive;
                            ">`+this.title.substring(0,Math.min(100, this.title.length))+`</td>
                <td style=" padding:2px;font-family: 'Dancing Script', cursive;
                            font-family: 'Island Moments', cursive;
                            font-family: 'Kalam', cursive;
                            font-family: 'Marhey', cursive;">`+this.similarity+`</td>
                <td style="padding:2px;font-family: 'Dancing Script', cursive;
                            font-family: 'Island Moments', cursive;
                            font-family: 'Kalam', cursive;
                            font-family: 'Marhey', cursive;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            "
                            >
                            <button style="
                            background: var(--accent-clr);
                            color: var(--light-clr);
                            border: none;
                            outline: none;
                            border-radius: 25px;
                            cursor: pointer;
                            font-size: 1.0125rem;" 
                            type="button" data-toggle="modal" data-target="#myModal"
                            id=${this.url} > View </button>
                <tr/>`;
      }
  }
function submit() {
    const text=document.getElementById('textarea').value ;
    document.getElementById('textarea').value ="";
    const json={
        "name":text,
    }
    document.getElementById("result_container").innerHTML=`
        <h1>Loading</h1>
        <div class="loader"></div> 
    `;
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://127.0.0.1:5000/predict_api");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response;
        newdata =JSON.parse(data);
        console.log(newdata)
        const head=`<div style="margin-top: 40px; font-size: 25px;font-family: 'Dancing Script', cursive;
        font-family: 'Island Moments', cursive;
        font-family: 'Kalam', cursive;
        font-family: 'Marhey', cursive;">RESULT
        </div>
        <div style="height: 10px;"></div>
        <table border="2px solid black" style="margin: auto;width: 80%; height: 300px;">
            <tr style="height: 50px;">
                <th style="width:50%; color: #89CFF0;">Similar Paper's</th>
                <th style="color: #89CFF0;">Similarity Percentage</th>
                <th style="color: #89CFF0;">Paper Reference</th>
            </tr>`;
        const tail=`</table>`;
        body="";
        for(let i=0;i<newdata.length;i++){
            x =new Tabledata(newdata[i].similarity_percentage,newdata[i].most_similar_article,`${i}`);
            body+=x.build();

            }
        document.getElementById("result_container").innerHTML=head+body+tail;
        for(let i=0;i<newdata.length;i++){
                document.getElementById(`${i}`).onclick=()=>{
                    console.log("hii");
                    document.getElementById(`abstractbox`).innerHTML=newdata[i].most_similar_article;
                }

            }
        }
    xhr.send(JSON.stringify(json));
    
}