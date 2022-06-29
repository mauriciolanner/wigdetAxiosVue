var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function () {
        const vm = new Vue(options);
    },

    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },

    executeAction: function (htmlElement, event) {
    }

});

options = {
    el: '#app',
    data: {
        loading: FLUIGC.loading('#app'),
        username: 'admin',
        password: 'tpleng@123',
        dados: [],
    },
    methods: {
        toast(titulo, mensagem, tipo) {
            FLUIGC.toast({
                title: titulo,
                message: mensagem,
                type: tipo
            });
        },
        async consomeAxios(xml) {
            let webServiceURL = WCMAPI.serverURL + '/webdesk/ECMDatasetService';
            let SOAPActionFluig = 'getDataset';

            let result = await axios.post(webServiceURL, xml,
                {
                    headers: {
                        'Content-Type': 'text/xml',
                        SOAPAction: SOAPActionFluig
                    }
                });

            let resultJson = JSON.parse(xml2json(result.data, { compact: true }));

            if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
                return this.criaObjetosArray(resultJson);
            } else {
                return this.criaObjeto(resultJson);
            }
        },
        criaObjetosArray(resultJson) {
            var parametros = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["columns"];
            var values = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"];

            var objeto = {};
            var arrayObjetos = []
            var forValues = values.length;
            if (typeof values.length === "undefined") {
                objeto = {};
                objeto[parametros['_text']] = values['value']['_text']
                return objeto;
            } else {
                for (var i = 0; i < forValues; i++) {
                    objeto = {};
                    for (var ii = 0; ii < parametros.length; ii++) {
                        objeto[parametros[ii]['_text']] = values[i]['value'][ii]['_text']
                    }
                    arrayObjetos.push(objeto)
                }
            }

            return arrayObjetos
        },
        criaObjeto(resultJson) {
            var parametros = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["columns"];
            var values = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"]["value"];
            var objeto = {};
            var arrayObjetos = []
            var forValues = values.length;

            if (typeof values.length === "undefined") {
                objeto = {};
                objeto[parametros['_text']] = values['_text']
                return objeto;
            } else {
                for (var i = 0; i < forValues; i++) {
                    objeto = {};
                    for (var ii = 0; ii < parametros.length; ii++) {
                        objeto[parametros[ii]['_text']] = values[ii]['_text']
                    }
                }
            }

            return objeto
        },
        xml(dataset) {
            var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">' +
                '<soapenv:Header />' +
                '<soapenv:Body>' +
                '<ws:getDataset>' +
                '<companyId>1</companyId>' +
                '<username>' + this.username + '</username>' +
                '<password>' + this.password + '</password>' +
                '<name>' + dataset + '</name>' +
                '<fields>' +
                '<item>?</item>' +
                '</fields>' +
                '<constraints>' +
                '<item>' +
                '<contraintType>?</contraintType>' +
                '<fieldName>?</fieldName>' +
                '<finalValue>?</finalValue>' +
                '<initialValue>?</initialValue>' +
                '<likeSearch>?</likeSearch>' +
                '</item>' +
                '</constraints>' +
                '<order>' +
                '<item>?</item>' +
                '</order>' +
                '</ws:getDataset>' +
                '</soapenv:Body>' +
                '</soapenv:Envelope>';

            return xml;
        },
        async carregaDados() {
            this.loading.show();
            let xml = this.xml("dsCentroCusto");
            this.dados = await this.consomeAxios(xml);
            console.log(this.dados);
            this.loading.hide();
        }
    },
    created: function () {
        //executa toda vez que a widget é carregada
    }
}