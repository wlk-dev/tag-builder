function generateTag() {
    const formData = new FormData( document.getElementById('tag-form') );
    data = formatData(formData);

    document.getElementById('output-json').value = JSON.stringify(data['json'], undefined, 4);
    document.getElementById('output-tag').value = data['tag'];
}

function formatData( formData ) {
    formData.set("ctm_value", `${formData.get("ctm_value")} ${formData.get("ctm_values")}`);
    formData.delete("ctm_values");

    var ctm_handle = formData.get("ctm_handle").replaceAll(" ", "_").toLowerCase() ;
    var base = `${ctm_handle}.handle/erni?`;
    var object = { "tag" : null, "json" : {} };

    formData.forEach(function(value, key){
        if(key === "ctm_tags" || key === "ctm_value") {
            object['json'][key] = value.toLowerCase();
        } else {
            object['json'][key] = value.replaceAll(" ", "_").toLowerCase();
        }
    });

    object['json']['ctm_date'] = new Date().toISOString();
    object["tag"] = base += new URLSearchParams(object['json']).toString();

    return object;
}

