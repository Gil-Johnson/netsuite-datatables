var phoneFormatter = require('phone-formatter');
var S = require('string');
var _ = require('underscore');
var moment = require('moment');

module.exports = function(recordset) {
    
    var recType = recordset.recordtype;

    delete recordset.output;
    delete recordset.rowsAffected;
    delete recordset.recordsets;

    var i = 0;

    for (i = 0; i < recordset.recordset.length; i++) {

        for (var prop in recordset.recordset[i]) {
          
            Object.keys(recordset.recordset[i]).forEach((key) => (recordset.recordset[i][key] == null || recordset.recordset[i][key] == 'NULL' ||
                !recordset.recordset[i][key] ||
                S(recordset.recordset[i][key]).collapseWhitespace().s == "") && delete recordset.recordset[i][key]);

            if (prop == 'SBAD_PHONE') {
                var formattedPhone = phoneFormatter.format(recordset.recordset[i][prop].toString(), "NNN.NNN.NNNN", {
                    normalize: false
                });
                recordset.recordset[i][prop] = formattedPhone;
                //     console.log(recordset.recordset[i][prop]);
            }
            
           if (prop.slice(-2) == "DT" || prop.slice(-3) == "DTM") {
            var formattedDate = moment(recordset.recordset[i][prop]).format('MM/DD/YYYY');
             
            recordset.recordset[i][prop] = formattedDate;
            
            }
            
            if(recType == 'cobs' && prop == 'MECB_INSUR_TYPE'){
                var insurType = 'MECB_INSUR_TYPE_' + recordset.recordset[i][prop];
                recordset.recordset[i][prop] = insurType;
            }
            
            if(recType == 'medicare' && prop == 'MEMD_EVENT_CD'){
            var insurType = 'MEMD_EVENT_CD_' + recordset.recordset[i][prop];
            recordset.recordset[i][prop] = insurType;
            }
            
           if(recType != 'members' && prop == 'MEME_CK'){
            var memID = 'member_' + recordset.recordset[i][prop];
            recordset.recordset[i][prop] = memID;
          }
          
          if(!recordset.recordset[i][prop]){
              
              recordset.recordset[i][prop] == 'no data';
          }
          
          
          
          
        }
        
    }

   
    return recordset;
}