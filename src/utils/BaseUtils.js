const changeClassId = (classId) => {
    switch (classId){
        case 1:
            return  "details_text_back";
        case 2:
            return  "details_text_front";
        case 3:
            return "details_text_data";
        case 4:
            return  "details_text_talk";
        default:

    }
    return classId;
}
const changeClassPortName = (classId) => {
    switch (classId){
        case 1:
            return  "java";
        case 2:
            return  "前端";
        case 3:
            return  "数据库";
        case 4:
            return  "report_talk";
        default:

    }
    return classId;
}
const changeClassPortId = (classId) => {
    switch (classId){
        case 1:
            return  "report_back";
        case 2:
            return  "report_front";
        case 3:
            return "report_data";
        case 4:
            return  "report_talk";
        default:

    }
    return classId;
}

const changeUserMessageType = (msgType) => {
    switch (msgType){
        case 1:
            return  "系统";
        case 2:
            return  "回贴";
        case 3:
            return "子回贴";
        default:
    }
    return msgType;
}

export {changeClassId,changeClassPortName,changeClassPortId,changeUserMessageType};