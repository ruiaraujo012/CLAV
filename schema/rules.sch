<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2"
    xmlns:sqf="http://www.schematron-quickfix.com/validator/process">
    
    <sch:pattern id="Relação_complementar_implicações_DF">
        <sch:rule context="/classe_N3/contexto_de_avaliação/processos_relacionados/processo_relacionado[relação='Complementar de']">
            <sch:assert test="/classe_N3/decisões_de_avaliação/destino_final[valor='C']">
                Uma relação de complementaridade implica a conservação dos PN's que mantêm essa relação.
            </sch:assert>
            <sch:assert test="/classe_N3/decisões_de_avaliação/destino_final/justificação_destinoFinal/critério[tipo='Critério Complementaridade Informacional']">
                Quando o PN em causa é "complementar de" outro, a justificação do DF deverá conter o "critério de complementaridade informacional".
            </sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern id="Relação_suplementar_implicações_PCA">
        <sch:rule context="/classe_N3/contexto_de_avaliação/processos_relacionados/processo_relacionado[relação='Suplemento para']">
            <sch:assert test="/classe_N3/decisões_de_avaliação/pca/justificação_PCA/critério[tipo='Critério Utilidade administrativa']">
                Quando o PN em causa é "suplemento para" outro, deve ser criado um "critério de utilidade administrativa" na justificação do respetivo PCA.
            </sch:assert>
        </sch:rule>
        <sch:rule context="/classe_N3/contexto_de_avaliação/processos_relacionados/processo_relacionado[relação='Suplemento de']">
            <sch:assert test="/classe_N3/decisões_de_avaliação/pca/justificação_PCA/critério[tipo='Critério Legal']">
                Quando o PN em causa é "suplemento de" outro, o critério a acrescenytar na justificação do PCA é o "critério legal".
            </sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern id="Relação_sintese_implicações_DF">
        <sch:rule context="/classe_N3/contexto_de_avaliação/processos_relacionados/processo_relacionado[relação='Sintese de']">
            <sch:assert test="/classe_N3/decisões_de_avaliação/destino_final[valor='C']">
                Quando o PN é "sintese de" outro, o destino final deve ter o valor de "C - conservação".
            </sch:assert>
            <sch:assert test="/classe_N3/decisões_de_avaliação/destino_final/justificação_destinoFinal/critério[tipo='Critério Densidade Informacional']">
                Se o PN tem uma relação de sintese, o seu DF deverá ter uma justificação onde consta um "critério de densidade informacional".
            </sch:assert>
        </sch:rule>
        <sch:rule context="/classe_N3/contexto_de_avaliação/processos_relacionados/processo_relacionado[relação='Sintetizado de']">
            <sch:assert test="/classe_N3/decisões_de_avaliação/destino_final[valor='E']">
                Quando o PN é "sintetizado de" outro, o destino final deve ter o valor de "E - eliminação".
            </sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern id="Destino_Final">
        <sch:rule context="/classe_N3/decisões_de_avaliação/destino_final/justificação_destinoFinal/critério">
            <sch:assert test="tipo='Critério Legal' or tipo='Critério Densidade Informacional' or tipo='Critério Complementaridade Informacional'">
                Um destino final, na sua justificação, deverá conter apenas critérios de densidade informacional, complementaridade informacional e legal.
            </sch:assert>
        </sch:rule>
        
    </sch:pattern>
</sch:schema>