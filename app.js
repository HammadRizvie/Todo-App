
function add()
{
    var inputDiv = document.getElementById("inputDiv");
    var form = document.createElement("form");
    form.setAttribute("id","iform");
    var input = document.createElement("input");
    input.setAttribute("id","itext");
    input.setAttribute("required","required");
    input.setAttribute("placeholder","Enter TODO");
    var inputBtn = document.createElement("button");
    inputBtn.setAttribute("type","submit");
    inputBtn.setAttribute("id","ibtn");
    var btntext = document.createTextNode("ADD");
    inputDiv.appendChild(form);
    form.appendChild(input);
    inputBtn.appendChild(btntext);
    form.appendChild(inputBtn);
    inputBtn.setAttribute("onClick","addin()");
    document.getElementById("addbtn").disabled = true;
}

function addin()
{
    var database = firebase.database().ref("todo");
    var key = database.push().key;
            var text = document.getElementById("itext");
            var todoApp = {
                todo: text.value,
                key: key
            }
            database.child(key).set(todoApp);
}


firebase.database().ref("todo").on('child_added',function(data)
{
    var tbleDiv = document.getElementById("tbleDiv");
    var div = document.createElement("div");
    tbleDiv.appendChild(div);
    div.setAttribute("id","divid");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var buttondel = document.createElement("button");
    buttondel.setAttribute("id","indel");
    buttondel.setAttribute("name",data.val().key)
    buttondel.setAttribute("onClick","idel(this)");
    var deltext = document.createTextNode("DELETE");
    buttondel.appendChild(deltext);
    var buttonedit = document.createElement("button");
    buttonedit.setAttribute("onClick","editext(this)");
    buttonedit.setAttribute("id","intex");
    buttonedit.setAttribute("value",data.val().key)
    var edittext = document.createTextNode("EDIT");
    buttonedit.appendChild(edittext);
    ul.appendChild(li);
    div.appendChild(ul);
    var textN = document.createTextNode(data.val().todo);
    li.appendChild(textN);
    li.appendChild(buttondel);
    li.appendChild(buttonedit);
    text.value = "";
})

function del()
{
   firebase.database().ref("todo").remove();
}



function idel(e)
{
    firebase.database().ref("todo").child(e.name).remove();
}

function editext(e)
{
    var x =  e.parentNode.firstChild.nodeValue;
    var pro = prompt("Enter text edition:",x);
 var database = firebase.database().ref("todo");
         var todoApp = {
             todo: pro,
             key: e.value
         }
         database.child(e.value).set(mtodoApp);
 e.parentNode.firstChild.nodeValue = pro;
}

