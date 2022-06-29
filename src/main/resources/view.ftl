<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
    data-params="MyWidget.instance()">
    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    <script src="/ecm_resources/resources/assets/forms/forms.js"></script>
    <script src="/ecm_resources/resources/assets/forms/wdkdetail.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <div id="app">
        <button class="btn btn-primary" @click="carregaDados">Carregar Dados</button>
        <table id="myTable" class="table">
            <thead>
                <tr>
                    <th>CODCCUSTO</th>
                    <th>NOME</th>
                    <th>ATIVO</th>
                    <th>CODCLASSIFICA</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dado, index) in dados">
                    <td>{{dado.CODCCUSTO}}</td>
                    <td>{{dado.NOME}}</td>
                    <td>{{dado.ATIVO}}</td>
                    <td>{{dado.CODCLASSIFICA}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>