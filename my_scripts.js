// alert(1);
// alert("ok");

$(document).ready(function(){
   
    var bar = $('.bar');
    var percent = $('.percent');

    // $('#formulaire_excel_upload').ajaxForm({


    //     beforeSend: function() {
    //         var percentVal = '0%';
    //         bar.width(percentVal)
    //         percent.html(percentVal);
    //     },
    //     uploadProgress: function(event, position, total, percentComplete) {
    //         var percentVal = percentComplete + '%';
    //         bar.width(percentVal)
    //         percent.html(percentVal);
    //     },
    //     complete: function(xhr) {

    //         if (xhr.readyState == 4) {
    //             if (xhr.status == 200) {
    //                 var data=xhr.responseText;
    //                 var jsonResponse = JSON.parse(data);
                
    //                 alert("Traitement bien effectué");
                    
    //             }else{
    //                 alert(xhr.responseText);
    //             }
    //         }
    //         // alert(xhr.responseText);
            
    //     }
    // });

    //   // alert(122);
    //   $('#FichierExcel').change(function(){
    //     $('#formulaire_excel_upload').submit();
    // });
    // SITEURL = jQuery('meta[name=SITEURL]').attr('content')
    // alert(10);

    // Changement du statut_matrimonial
    $('#id_statut_matrimonial').change(function(){

        // alert($('#id_statut_matrimonial').val());
        id_statut_matrimonial = $('#id_statut_matrimonial').val();
        if(id_statut_matrimonial!=""){

            //on compose la forme sélectionnée
            ma_chaine='#id_statut_matrimonial option[value="'+id_statut_matrimonial+'"]'
            nbre_part = $(ma_chaine).attr('nbre_part');
            // $('#SAI_Nbre_part').attr('value',nbre_part);
            $('#SAI_Nbre_part').val(nbre_part);
        }

    });

    $('#Calcul_paie').click(function(){
       
        SAI_Salaire_brut = $('#SAI_Salaire_brut').val();
        rNParts = $('#SAI_Nbre_part').val();
        SAI_Nbre_jrs_trav = $('#SAI_Nbre_jrs_trav').val();
        //  alert("Vous avez validez");

        //CNPS
        if(SAI_Salaire_brut<=2700000){
            SAI_CNPS = SAI_Salaire_brut*0.063 ;
        }
        else{
            SAI_CNPS=2700000*0.063;
        }
        
        $('#SAI_CNPS').val(SAI_CNPS);

        
//////// CALCUL DE L'IMPOT BRUT

    nSb  = SAI_Salaire_brut;
    nK =0;
    nL =0;
    nM =0;
    nN =0;
    nP =0;
    nS =0;
    if(nSb<=75000){
        nK=0;
    }
    if(nSb>75000 && nSb<=240000){
        nL= 0.16*(nSb-75000); 
    }
    if(nSb>240000 && nSb<=800000  ){
        nM= 0.21*(nSb-240000)+26400;
    }
    if(nSb>800000 && nSb<=2400000  ){
        nN= 0.24*(nSb-800000)+144000;
    }
    if(nSb>2400000 && nSb<=8000000  ){
        nP= 0.28*(nSb-2400000)+528000;
    }
   
    if(nSb>8000000){
        nS= 0.32*(nSb-8000000)+2096000;
    }
   
    SAI_Impot_brut = (nK+nL+nM+nN+nP+nS)*SAI_Nbre_jrs_trav/30;
    $('#SAI_Impot_brut').val(SAI_Impot_brut);


    // SELON nSb
        // CAS <=75000
        //     nK=0	
        // CAS 75000<*<=240000 : 
        //     nL= 0.16*(nSb-75000)	
        // CAS 240000<*<=800000 : 
        //     nM= 0.21*(nSb-240000)+26400
        // CAS 800000<*<=2400000 : 
            // nN= 0.24*(nSb-800000)+144000
        // CAS 2400000<*<=8000000
            // nP= 0.28*(nSb-2400000)+528000
        // CAS >8000000
            // nS= 0.32*(nSb-8000000)+2096000
    // FIN
    // SC_Fiche.SAI_Impot_brut= (nK+nL+nM+nN+nP+nS)*SC_Fiche.SAI_Nbre_jrs_trav/30



        // DETERMINATION DU RICF
        // SAI_RICF =  $('#SAI_RICF').val(SAI_RICF);
        // rNParts est un réel = SC_Fiche.SAI_Nbre_part
        if( rNParts==1){
            SAI_RICF =0;
        }
        if( rNParts==1.5 ){
            SAI_RICF = 5500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==2){
            SAI_RICF = 11000*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==2.5){
            SAI_RICF =16500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==3 ){
            SAI_RICF = 22000*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==3.5){
            SAI_RICF = 27500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==4 ){
            SAI_RICF = 33000*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==4.5 ){
            SAI_RICF = 38500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==5){
            SAI_RICF = 44000*SAI_Nbre_jrs_trav/30;
        }
    
        $('#SAI_RICF').val(SAI_RICF);
        

        SAI_Impot_brut = $('#SAI_Impot_brut').val();
        SAI_CMU_SALARIAL = $('#SAI_CMU_SALARIAL').val();
        SAI_CNPS = $('#SAI_CNPS').val();
        SAI_RICF = $('#SAI_RICF').val();
        SAI_Autres_retenues = $('#SAI_Autres_retenues').val();
        SAI_Elements_non_imposable = $('#SAI_Elements_non_imposable').val();
       

        SAI_TOT_RETENUES_REFORMEES = parseFloat(SAI_Impot_brut) + parseFloat(SAI_CMU_SALARIAL)+parseFloat(SAI_CNPS-SAI_RICF)+ parseFloat(SAI_Autres_retenues);
        SAI_NETAPAYER_R= parseFloat(SAI_Salaire_brut) - parseFloat(SAI_Impot_brut) - parseFloat(SAI_CMU_SALARIAL)- parseFloat(SAI_CNPS)+ parseFloat(SAI_RICF)+ parseFloat(SAI_Elements_non_imposable);
        // SAI_ECART= SAI_NETAPAYER_R - SAI_NET_A_PAYER

        $('#SAI_TOT_RETENUES_REFORMEES').val(SAI_TOT_RETENUES_REFORMEES);
        $('#SAI_NETAPAYER_R').val(SAI_NETAPAYER_R);
        // $('#SAI_TOT_RETENUES_REFORMEES').val(SAI_TOT_RETENUES_REFORMEES);

        SAI_IMPOT_NETAPAYER = parseFloat(SAI_Impot_brut) - parseFloat(SAI_RICF) 
        $('#SAI_IMPOT_NETAPAYER').val(SAI_IMPOT_NETAPAYER);




    });//Fin click Bouton Calcul_paie

    $('#Paie_inverse').click(function(){
        rNParts = $('#SAI_Nbre_part').val();
        SAI_Nbre_jrs_trav =  $('#SAI_Nbre_jrs_trav').val();
        SAI_RICF =0;
        //Calcul RICF
        if( rNParts==1){
            SAI_RICF =0;
        }
        if( rNParts==1.5 ){
            SAI_RICF = 5500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==2){
            SAI_RICF = 11000*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==2.5){
            SAI_RICF =16500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==3 ){
            SAI_RICF = 22000*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==3.5){
            SAI_RICF = 27500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==4 ){
            SAI_RICF = 33000*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==4.5 ){
            SAI_RICF = 38500*SAI_Nbre_jrs_trav/30;
        }
        if( rNParts==5){
            SAI_RICF = 44000*SAI_Nbre_jrs_trav/30;
        }
    
        $('#SAI_RICF').val(SAI_RICF);
        
        SAI_NETAPAYER_R = parseFloat($('#SAI_NETAPAYER_R').val());
        SAI_Elements_non_imposable = parseFloat($('#SAI_Elements_non_imposable').val());
        SAI_Autres_retenues = parseFloat($('#SAI_Autres_retenues').val());
        
        nNAP   = SAI_NETAPAYER_R;
        nK =0;
        nL =0;
        nM =0;
        nN =0;
        nP =0;
        nS =0;

        if(nNAP<=69775){
            nK=0;
        }
        if(nNAP>69775 && nNAP<=197980){
            nL= (nNAP+500-(0.16*75000)-SAI_RICF-SAI_Elements_non_imposable+SAI_Autres_retenues)/0.777	;
        }
        if(nNAP>197980 && nNAP<=605100){
            nM= (nNAP+500-(0.21*240000)+26400-SAI_RICF-SAI_Elements_non_imposable+SAI_Autres_retenues)/0.727
        }
        if(nNAP>605100 && nNAP<=1720300){
            nN= (nNAP+500-(0.24*800000)+144000-SAI_RICF-SAI_Elements_non_imposable+SAI_Autres_retenues)/0.697
        }
        if(nNAP>1720300 && nNAP<=5733400){
            nP= (nNAP+500-(0.28*2400000)+528000-SAI_RICF-SAI_Elements_non_imposable+SAI_Autres_retenues)/0.657
        }
        if(nNAP>5733400){
            nS= (nNAP+500-(0.32*8000000)+2096000-SAI_RICF-SAI_Elements_non_imposable+SAI_Autres_retenues)/0.617
        }
       
        SAI_Salaire_brut = (nK+nL+nM+nN+nP+nS)*SAI_Nbre_jrs_trav/30
        $('#SAI_Salaire_brut').val(SAI_Salaire_brut);
        
    });//Fin click Bouton Calcul_paie
    

});