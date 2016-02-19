/*!
 * UnPack MeVitae v0.0.1 (https://jobseeker.mevitae.com/unpack.html) by Vivek
 * Copyright 2016 MeVitae.
 * Licensed under the MIT license
 */

function unMevitaeize(component, value, HeadA, HeadB) {
    var arrayValue = [];
    if (value != null & value != undefined) {
        if (component == "TypeA") {
            if (value != "") {
                var valueSplit = value.split("MeVitaeSplit");
                for (var i = 0; i < valueSplit.length; i++) {
                    var valueSplitValueSplit = valueSplit[i].split("MeVitaeValue");
                    if (valueSplitValueSplit[1] != undefined) {
                        var jsonData = {};
                        jsonData[HeadA] = valueSplitValueSplit[1];
                        jsonData[HeadB] = valueSplitValueSplit[2];
                        arrayValue.push(jsonData);
                    }
                }
            }
        }
    }
    return arrayValue;
}

function structureData(data) {
    // Make sure the data is not null
    if (data != null & data != undefined) {
        // Check for summary model
        if (data.SummaryModel != null & data.SummaryModel != undefined)
            data.SummaryModel.Languages = unMevitaeize("TypeA", data.SummaryModel.Languages, "Language", "Level");
        // Check for experience model
        if (data.ExperienceModelList != null & data.ExperienceModelList != undefined) {
            if (data.ExperienceModelList.length > 0) {
                for (var i = 0; i < data.ExperienceModelList.length; i++) {
                    data.ExperienceModelList[i].Skill = unMevitaeize("TypeA", data.ExperienceModelList[i].Skill, "Skill", "Usage");
                }
            }
        }
        // Check for education model
        if (data.EducationModelList != null & data.EducationModelList != undefined) {
            if (data.EducationModelList.length > 0) {
                for (var i = 0; i < data.EducationModelList.length; i++) {
                    data.EducationModelList[i].Modules = unMevitaeize("TypeA", data.EducationModelList[i].Modules, "Module", "Score");
                }
            }
        }
        // Disable skill model
        if (data.SkillsModel != null & data.SkillsModel != undefined)
            data.SkillsModel = null;
        // Check for project model
        if (data.ProjectModelList != null & data.ProjectModelList != undefined) {
            if (data.ProjectModelList.length > 0) {
                for (var i = 0; i < data.ProjectModelList.length; i++) {
                    data.ProjectModelList[i].Skill = unMevitaeize("TypeA", data.ProjectModelList[i].Skill, "Skill", "Usage");
                }
            }
        }
    }


    return data;
}

function getData(api) {
    var result;
    var base = "https://jobseeker.mevitae.com/api/";
    var baseLocal = "https://localhost:44310/api/";
    $.ajax({
        url: base + api,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data, status) {
            if (status == "success") {
                result = structureData(data);
            }
            else {
                result = undefined;
            }
        },
        error: function (response) {
            result = undefined;
        }
    });
    return result;
}

function getCV(userid) {
    return getData("resumeModels?userid=" + userid + "&ishosted=true");
}