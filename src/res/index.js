window.disableDomainGroupTree = true;

var api_list = [
    { url : '/api/domain', title : i18n.get('ui.label.domain'), tableKeyField: 'domain' },


    { url : '/api/business', title : i18n.get('ui.label.business'), tableKeyField : 'business', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain' }   }
    ]},


    { url : '/api/instance', title : i18n.get('ui.label.instance'), tableKeyField : 'instance', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain' }   }
    ]},


    { url : '/api/metrics', title : i18n.get('ui.label.metrics'), tableKeyField : 'metrics', convert : function (obj) {

        var $table = $("<table class='table simple' />");
        var $thead = $("<thead />");
        var $tr = $("<tr />"); $tr.append("<th width='200px'>"+i18n.get('ui.label.agent.getData')+"</th>"); $tr.append("<th>Metrics</th>"); $thead.append($tr);
        $table.append($thead);
        var $tbody = $("<tbody />");

        var $tr = $("<tr />"); $tr.append("<th>domain</th>"); $tr.append("<td>"+ convert_metrics_manual(obj.domain) +"</td>"); $tbody.append($tr);
        $tr = $("<tr />"); $tr.append("<th>instance</th>"); $tr.append("<td>"+ convert_metrics_manual(obj.instance) +"</td>"); $tbody.append($tr);
        $tr = $("<tr />"); $tr.append("<th>business</th>"); $tr.append("<td>"+ convert_metrics_manual(obj.business) +"</td>"); $tbody.append($tr);

        $table.append($tbody);

        return $table;

    }},


    { url : '/api/realtime/domain', title : '['+i18n.get('ui.label.realtimeData')+'] ' + i18n.get('ui.label.domain'), tableKeyField: 'RealtimeDomainData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : false , input : { type : 'select', content : 'domain', required: false }   }
    ] },


    { url : '/api/realtime/business', title : '['+i18n.get('ui.label.realtimeData')+'] ' + i18n.get('ui.label.business'), tableKeyField : 'RealtimeBusinessData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : function () {
            var domain_id = $(this).val();
            $.get('/api/business', { domain_id : domain_id }, function (data) {
                update_business_select($("#business_id"), data.business, { required : false });
                $("#business_id").change();
            } )
        }}},
        { key : 'business_id', title : i18n.get("ui.label.business.id"), type : 'short', required : false , input : { type : 'select', content : 'business', id: 'business_id', required: false }   }
    ]},


    { url : '/api/realtime/instance', title : '['+i18n.get('ui.label.realtimeData')+'] ' + i18n.get('ui.label.instance'), tableKeyField : 'RealtimeInstanceData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'short', required : false , input : { type : 'select', content : 'instance', id: 'instance_id', required: false }   }
    ]},


    { url : '/api/dbmetrics/domain', title : '[' + i18n.get('ui.label.analysis') + '] '+i18n.get('ui.label.search.metrics')+' - ' + i18n.get('ui.label.domain'), tableKeyField : 'dbmetric', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain'} },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'interval_minute', title : 'Interval Minute', type : 'short', defaultValue: '1', required : true , input : { type : 'range', min: 0, max : 1000, step : 1 } },
        { key : 'metrics', title : i18n.get('ui.label.metrics'), type : 'string', required : true , input : { type : 'select', content : 'metrics' } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input'} }
    ], render : {
        time : function (value) {
            return getServerMoment(+(value)).format("YYYY-MM-DD HH:mm:ss");
        }
    }},

    { url : '/api/dbmetrics/business', title : '[' + i18n.get('ui.label.analysis') + '] '+i18n.get('ui.label.search.metrics')+' - ' + i18n.get('ui.label.business'), tableKeyField : 'dbmetric', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : function () {
            var domain_id = $(this).val();
            $.get('/api/business', { domain_id : domain_id }, function (data) {
                update_business_select($("#business_id"), data.business, { required : false });
                $("#business_id").change();
            });
        }}},
        { key : 'business_id', title : i18n.get("ui.label.business.id"), type : 'short', required : true , input : { type : 'select', content : 'business', id: 'business_id', required: true }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'interval_minute', title : 'Interval (By minute)', type : 'short', defaultValue: '1', required : true , input : { type : 'range', min: 0, max : 1000, step : 1 } },
        { key : 'metrics', title : i18n.get('ui.label.metrics'), type : 'string', required : true , input : { type : 'select', content : 'metrics' } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input'} }
    ], render : {
        time : function (value) {
            return getServerMoment(+(value)).format("YYYY-MM-DD HH:mm:ss");
        }
    }},

    { url : '/api/dbmetrics/instance', title : '[' + i18n.get('ui.label.analysis') + '] '+i18n.get('ui.label.search.metrics')+' - ' + i18n.get('ui.label.instance'), tableKeyField : 'dbmetric', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'short', required : true , input : { type : 'select', content : 'instance', id: 'instance_id', required: true }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'interval_minute', title : 'Interval (By minute)', type : 'short', defaultValue: '1', required : true , input : { type : 'range', min: 0, max : 1000, step : 1, postfix : i18n.get('ui.label.minute') } },
        { key : 'metrics', title : i18n.get('ui.label.metrics'), type : 'string', required : true , input : { type : 'select', content : 'metrics' } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input'} }
    ], render : {
        time : function (value) {
            return getServerMoment(+(value)).format("YYYY-MM-DD HH:mm:ss");
        }
    }},

    { url : '/api/status/application', title : '[' + i18n.get('ui.label.analysis') + '] '+i18n.get('ui.title.service')+'(TopN) - ' + i18n.get('ui.label.application'), tableKeyField : 'status', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'short', required : false, input : { type : 'select', content : 'instance', id: 'instance_id', required: false }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'sort_by_metrics', title : i18n.get('ui.label.metrics.standard'), type : 'string', required : false , input : { type : 'select', content : 'sort_by_metrics', required : false } },
        { key : 'max_row', title : i18n.get('ui.label.maxRowCount'), type : 'number', required : false , input : { type : 'range', min : 0, max : 1000, value : 1000 } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input'} }
    ]},

    { url : '/api/status/sql', title : '[' + i18n.get('ui.label.analysis') + '] '+i18n.get('ui.title.service')+'(TopN) - ' + i18n.get('ui.label.sql'), tableKeyField : 'status', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'short', required : false, input : { type : 'select', content : 'instance', id: 'instance_id', required: false }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'sort_by_metrics', title : i18n.get('ui.label.metrics.standard'), type : 'string', required : false , input : { type : 'select', content : 'sort_by_metrics_for_sql', required : false } },
        { key : 'max_row', title : i18n.get('ui.label.maxRowCount'), type : 'number', required : false , input : { type : 'range', min : 0, max : 1000, value : 1000 } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input'} }
    ]},

    { url : '/api/status/external_call', title : '[' + i18n.get('ui.label.analysis') + '] '+i18n.get('ui.title.service')+'(TopN) - ' + i18n.get('ui.en.externalcall'), tableKeyField : 'status', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'short', required : false, input : { type : 'select', content : 'instance', id: 'instance_id', required: false }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'sort_by_metrics', title : i18n.get('ui.label.metrics.standard'), type : 'string', required : false , input : { type : 'select', content : 'sort_by_metrics_for_sql', required : false } },
        { key : 'max_row', title : i18n.get('ui.label.maxRowCount'), type : 'number', required : false , input : { type : 'range', min : 0, max : 1000, value : 1000 } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input'} }
    ]}

    ,

    { url : '/api/dbsearch/event', title : '[' + i18n.get('ui.label.analysis') + '] ' + i18n.get('ui.label.search.event'), tableKeyField : 'EventList', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : function () {
            var domain_id = $(this).val();
            $.get('/api/instance', { domain_id : domain_id }, function (data) {
                update_instance_select($("#instance_id"), data.instance, { required : false });
                $("#instance_id").change();
            } );
            $.get('/api/business', { domain_id : domain_id }, function (data) {
                update_business_select($("#business_id"), data.business, { required : false });
                $("#business_id").change();
            });
        }}},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'array', message : ' * ctrl + click = multiple select', required : false, input : { type : 'select', content : 'instance', id: 'instance_id', required: false, multiple : true  }   },
        { key : 'business_id', title : i18n.get("ui.label.business.id"), type : 'array', message : ' * ctrl + click = multiple select', required : false , input : { type : 'select', content : 'business', id: 'business_id', required: false, multiple : true }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'level', title : 'Event Level', type : 'array', required : false, message : ' * ctrl + click = multiple select' , input : { type : 'select', content : ['normal', 'warning', 'fatal'], required : false, multiple: true } },
        { key : 'group_by', title : 'Group By', type : 'array', required : false, message : ' * ctrl + click = multiple select' , input : { type : 'select', content : ['time'/* 메뉴얼에 없다, 멀 해야할지 */], required : false, multiple: true } },
        { key : 'time_period', title : 'Time Period', type : 'timestamp', required : false , input : { type : 'input', required : false } },
        { key : 'max_row', title : i18n.get('ui.label.maxRowCount'), type : 'number', required : false , input : { type : 'range', min : 0, max : 1000, value : 1000 } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input', required : false } }
    ]},

    { url : '/api/transaction/txid', title : '['+i18n.get('ui.label.search')+'] '+i18n.get('ui.label.transaction')+' ('+i18n.get('ui.title.xviewPointList')+')', tableKeyField : 'transactionData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain'}},
        { key : 'txid', title : i18n.get('ui.label.txid'), type : 'string', required : true , input : { type : 'input'} },
        { key : 'time', title : 'Transaction Time', type : 'timestamp', required : true , input : { type : 'input' } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input', required : false } }
    ], convert : function (obj) {

        var $table = $("<table class='table simple' />");
        var $thead = $("<thead />");
        var $tr = $("<tr />"); $tr.append("<th width='200px'>Key</th>"); $tr.append("<th>Value</th>"); $thead.append($tr);
        $table.append($thead);
        var $tbody = $("<tbody />");

        Object.keys(obj).forEach(function (key) {
            var $tr = $("<tr />"); $tr.append("<th>" + key + "</th>"); $tr.append("<td>"+ obj[key] +"</td>"); $tbody.append($tr);
        });

        $table.append($tbody);

        return $table;

    }},
    { url : '/api/transaction/profile', dataType: 'txt', title : '['+i18n.get('ui.label.search')+'] '+i18n.get('ui.label.transaction')+' ('+i18n.get('ui.label.profile.active')+')', tableKeyField : 'transactionData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain'}},
        { key : 'txid', title : i18n.get('ui.label.txid'), type : 'string', required : true , input : { type : 'input'} },
        { key : 'time', title : 'Transaction Time', type : 'timestamp', required : true , input : { type : 'input' } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input', required : false } }
    ], convert : function (list, obj) {
        return $("<pre />").html(obj);

    }, convertType : 'html'},

    { url : '/api/transaction/guid', title : '['+i18n.get('ui.label.search')+'] GUID', tableKeyField : 'TransactionData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain'}},
        { key : 'guid', title : 'GUID', type : 'string', required : true , input : { type : 'input'} },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input', required : false } }
    ]},

    { url : '/api/transaction/time', title : '['+i18n.get('ui.label.search')+'] '+i18n.get('ui.label.transaction')+' ' + i18n.get('ui.label.time'), tableKeyField : 'TransactionData', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'array', message : ' * ctrl + click = multiple select', required : false, input : { type : 'select', content : 'instance', id: 'instance_id', required: false, multiple : true  }   },
        { key : 'start_time', title : i18n.get("ui.label.startTime"), type : 'timestamp', required : true , input : { type : 'timestamp' } },
        { key : 'end_time', title : i18n.get("ui.label.endTime"), type : 'timestamp', required : true , message : 'only 1 minute!',  input : { type : 'timestamp', max: 1 } },
        { key : 'time_pattern', title : 'Time Pattern', type : 'timepattern', defaultValue: '', required : false , input : { type : 'input', required : false } }
    ]},

    { url : '/api/activeService/list', title : '['+i18n.get('ui.title.activeService')+'] ' + i18n.get('ui.label.list'), tableKeyField : 'ActiveServiceList', query : [
        { key : 'domain_id', title : i18n.get("ui.label.sid"), type : 'short', required : true , input : { type : 'select', content : 'domain', change : bind_instance }},
        { key : 'instance_id', title : i18n.get("ui.label.instId"), type : 'array', message : i18n.get('ui.label.topbar.instance.multi.memo'), required : false, input : { type : 'select', content : 'instance', id: 'instance_id', required: false, multiple : true  }   }
    ]}

];

var ERROR_MESSAGE = [
    "Domain is not connected",
    "Data server's internal error",
    "cannot be cast to"
];

var param_keys = ['key', 'title', 'value', 'defaultValue', 'type', 'required'];

var SORT_BY_METRICS = [
    "calls",
    "failures",
    "badResponses",
    "cpuTimePerTransaction",
    "totalCpuTime",
    "responseTime",
    "totalResponseTime",
    "maxResponseTime",
    "sqls",
    "sqlsPerTransaction",
    "sqlTimePerTransaction",
    "totalSqlTime",
    "externalCalls",
    "externalCallsPerTransaction",
    "externalCallTimePerTransaction",
    "totalExternalCallTime",
    "fetches",
    "fetchesPerTransaction",
    "fetchTimePerTransaction",
    "frontendMeasurements",
    "networkTime",
    "frontendTime",
    "totalFetchTime"
];

var SORT_BY_METRICS_NAME = [
    i18n.get("ui.mx.service_count"),
    i18n.get("ui.mx.service_err_count"),
    i18n.get("ui.mx.service_slow_count"),
    i18n.get("ui.mx.service_cpu"),
    i18n.get("ui.stats.service.cpuSum"),
    i18n.get("ui.mx.service_time"),
    i18n.get("ui.label.sumResponseTime"),
    i18n.get("ui.stats.service.maxResponseTime"),
    i18n.get("ui.mx.sql_count"),
    i18n.get("ui.stats.service.averageSqlCount"),
    i18n.get("ui.mx.service_sql_time"),
    i18n.get("ui.stats.service.sqlSum"),
    i18n.get("ui.mx.externalcall_count"),
    i18n.get("ui.stats.service.averageTxcallCount"),
    i18n.get("ui.mx.service_externalcall_time"),
    i18n.get("ui.stats.service.averageTxcallTime"),
    i18n.get("ui.mx.fetch_count"),
    i18n.get("ui.stats.service.averageFetchCount"),
    i18n.get("ui.mx.service_fetch_time"),
    i18n.get("ui.mx.frontend_measure_count"),
    i18n.get("ui.mx.average_frontend_network_time"),
    i18n.get("ui.mx.average_frontend_time"),
    i18n.get("ui.stats.service.fetchSum")
];

var SORT_BY_METRICS_FOR_SQL = [
    "calls",
    "failures",
    "badResponses",
    "responseTime",
    "totalResponseTime"
];

var SORT_BY_METRICS_FOR_SQL_NAME = [
    i18n.get("ui.mx.service_count"),
    i18n.get("ui.mx.service_err_count"),
    i18n.get("ui.mx.service_slow_count"),
    i18n.get("ui.mx.service_time"),
    i18n.get("ui.label.sumResponseTime")
];

var i18n_list = {
    "domain_id" : i18n.get("ui.label.sid"),
    "instance_id" : i18n.get("ui.label.instId"),
    "business_id" : i18n.get("ui.label.business.id"),
    "start_time" : i18n.get("ui.label.startTime"),
    "end_time" : i18n.get("ui.label.endTime")
}

function bind_instance() {
    var domain_id = $(this).val();
    $.get('/api/instance', { domain_id : domain_id }, function (data) {
        update_instance_select($("#instance_id"), data.instance, { required : false });
        $("#instance_id").change();
    } )
}

function convert_metrics_manual(list) {
    var temp = [];

    var $table = $("<table class='simple table hover'></table>");
    var $tbody = $("<tbody />");

    $table.append($tbody);

    for(var i = 0, len = list.length; i< len; i++) {
        var $tr = $("<tr />");

        $tr.append("<td  style='font-weight:bold'>" + list[i] + "</td>");
        $tr.append("<td >" + i18n.get("ui.mx." + list[i]) + "</td>");

        $tbody.append($tr);
    }

    return $table.clone().wrap('<p>').parent().html();;
}

function set_params (initData) {

    window.initData = initData;

    var $api = $("#api");
    var value = $api.val();

    if (value == '') {
        alert('Select API');
        return;
    }

    var index = +$api.val();
    var o = api_list[index];

    if (!o.query) {
        $("#parameter-list").addClass('parameter-none');
        $(".layout-body").addClass('parameter-none');
        return;
    }

    $("#data-type").val(o.dataType || 'json');

    $("#parameter-list").removeClass('parameter-none');
    $(".layout-body").removeClass('parameter-none');

    var $table = $("<table class='simple table'></table>");
    var $thead = $("<thead />");
    var $tbody = $("<tbody />");

    $table.append($thead).append($tbody);

    var $tr = $("<tr />");

    $tr.append("<th width='100px'>Key</th>");
    $tr.append("<th width='100px' >Title</th>");
    $tr.append("<th width='300px'>Value</th>");
    $tr.append("<th>Description</th>");
    $tr.append("<th >Type</th>");
    $tr.append("<th >Required</th>");

    $thead.append($tr);

    for(var dataIndex = 0, dataLength = o.query.length; dataIndex < dataLength; dataIndex++) {
        $tbody.append(create_param(o.query[dataIndex]));
    }

    $("#parameter-list").html($table);
}

function create_param (query) {
    var $tr = $("<tr />");

    for(var i = 0, len = param_keys.length; i < len; i++) {
        var param = query[param_keys[i]];
        var key = param_keys[i];

        var $td = $("<td />");

        switch (key) {
            case 'value':
                $td.html(create_param_input(query, query.key));
                break;
            case 'defaultValue':
                $td.html(create_param_default_value(query, query.key));
                if (query.message) {
                    $td.append(create_param_message(query));
                }

                break;
            default:
                $td.html(param);
                break;
        }

        $tr.append($td);
    }

    return $tr;
}

function create_param_input(query, key) {
    var $input;
    if (!initData) {
        $input = $("<input type='text' class='input param' name='"+key+"' />");
    } else {

        var input = query.input || {};

        if (input.type == 'select') {
            if (input.content == 'domain') {
                $input = create_domain_select(initData.domain, key, input);
            } else if (input.content == 'business') {
                $input = create_business_select([], key, input);
            } else if (input.content == 'instance') {
                $input = create_instance_select([], key, input);
            } else if (input.content == 'metrics') {
                $input = create_metrics_select(key, input);
            } else if (input.content == 'sort_by_metrics') {
                $input = create_sort_by_metrics_select(key, input);
            } else if (input.content == 'sort_by_metrics_for_sql') {
                $input = create_sort_by_metrics_for_sql_select(key, input);
            } else if ($.isArray(input.content)) {
                $input = create_select(key, input);
            }
        } else if (input.type == 'range') {
            $input = $("<input type='number' class='param input' name='"+key+"' min='"+(input.min || 0)+"' max='"+(input.max || 100)+"' step='"+(input.step || 1)+"' value='"+(input.value || 0)+"' />");
        } else if (input.type == 'timestamp') {
            $input = $("<input type='hidden' class='param' name='"+key+"' /><input type='datetime-local' class='date input' name='"+key+"_date' value='"+ (getServerMoment().format("YYYY-MM-DDT00:00:00")) +"' />");

            if (input.max) {
                $input.eq(1).attr('title', 'Max ' + input.max + ' minute!');
            }
        } else {
            $input = $("<input type='text' class='input param' name='"+key+"' />");
        }
    }

    if (query.defaultValue) {
        $input.val(query.defaultValue);
    }



    return $input;
}

function create_select(key, input) {
    var list = input.content || [];
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id || "");
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    for(var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var $options = $("<option />").text(i18n.get('ui.label.' + item) + " ( " + item + " )").val(item);

        $select.append($options);
    }

    if (input.multiple) {
        $select.attr('multiple', 'multiple');
    }

    if (input.change) {
        $select.on('change', input.change);

        setTimeout(function () {
            $select.change();
        }, 1000);
    }

    return $select;
}

function create_domain_select(domain_list, key, input) {
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id);
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    for(var i = 0, len = domain_list.length; i < len; i++) {
        var domain = domain_list[i];
        var $options = $("<option />").text(domain.name + " (" +  domain.domainId + ")").val(domain.domainId);

        $select.append($options);
    }

    if (input.multiple) {
        $select.attr('multiple', 'multiple');
    }

    if (input.change) {
        $select.on('change', input.change);

        setTimeout(function () {
            $select.change();
        }, 1000);
    }

    return $select;
}

function update_business_select($select, business_list, input) {

    $select.empty();
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }
    for(var i = 0, len = business_list.length; i < len; i++) {
        var business = business_list[i];
        var $options = $("<option />").text(business.name + " (" +  business.businessId + ")").val(business.businessId);

        $select.append($options);
    }

}

function create_business_select(business_list, key, input) {
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id);
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    for(var i = 0, len = business_list.length; i < len; i++) {
        var business = business_list[i];
        var $options = $("<option />").text(business.name + " (" +  business.businessId + ")").val(business.businessId);

        $select.append($options);
    }

    if (input.multiple) {
        $select.attr('multiple', 'multiple');
    }

    if (input.change) {
        $select.on('change', input.change).change();
    }

    return $select;
}

function update_instance_select($select, instance_list, input) {

    $select.empty();
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }
    for(var i = 0, len = instance_list.length; i < len; i++) {
        var instance = instance_list[i];
        var $options = $("<option />").text(instance.name + " (" +  instance.instanceId + ")").val(instance.instanceId);

        $select.append($options);
    }

}

function create_metrics_select(key, input) {
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id);
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    $.get('/api/metrics', function (data) {
        var metrics = data.metrics;

        var metricsData = metrics.domain;
        var $optionGroup = $("<optgroup label='Domain' />");
        for(var i = 0, len = metricsData.length; i < len; i++) {
            var metricsItem = metricsData[i];
            var $options = $("<option />").text(i18n.get('ui.mx.' + metricsItem)).val(metricsItem);
            $optionGroup.append($options);
        }
        $select.append($optionGroup);

        metricsData = metrics.instance;
        $optionGroup = $("<optgroup label='Instance' />");
        for(var i = 0, len = metricsData.length; i < len; i++) {
            var metricsItem = metricsData[i];
            var $options = $("<option />").text(i18n.get('ui.mx.' + metricsItem)).val(metricsItem);
            $optionGroup.append($options);
        }
        $select.append($optionGroup);

        metricsData = metrics.business;
        $optionGroup = $("<optgroup label='Business' />");
        for(var i = 0, len = metricsData.length; i < len; i++) {
            var metricsItem = metricsData[i];
            var $options = $("<option />").text(i18n.get('ui.mx.' + metricsItem)).val(metricsItem);
            $optionGroup.append($options);
        }
        $select.append($optionGroup);


        if (input.change) {
            $select.on('change', input.change).change();
        }

    });

    return $select;
}

function create_sort_by_metrics_select(key, input) {
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id);
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    var metricsData = SORT_BY_METRICS;
    for(var i = 0, len = metricsData.length; i < len; i++) {
        var metricsItem = metricsData[i];
        var name = SORT_BY_METRICS_NAME[i];
        var $options = $("<option />").text(name).val(metricsItem);
        $select.append($options);
    }

    if (input.change) {
        $select.on('change', input.change).change();
    }

    return $select;
}

function create_sort_by_metrics_for_sql_select(key, input) {
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id);
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    var metricsData = SORT_BY_METRICS_FOR_SQL;
    for(var i = 0, len = metricsData.length; i < len; i++) {
        var metricsItem = metricsData[i];
        var name = SORT_BY_METRICS_FOR_SQL_NAME[i];
        var $options = $("<option />").text(name).val(metricsItem);
        $select.append($options);
    }

    if (input.change) {
        $select.on('change', input.change).change();
    }

    return $select;
}

function create_instance_select(instance_list, key, input) {
    var $select = $("<select class='input param' name=" + key + "/>").attr('id', input.id);
    if (input.required === false) {
        $select.append("<option value=''>None</option>");
    }

    for(var i = 0, len = instance_list.length; i < len; i++) {
        var instance = instance_list[i];
        var $options = $("<option />").text(instance.name + " (" +  instance.instanceId + ")").val(instance.instanceId);

        $select.append($options);
    }


    if (input.multiple) {
        $select.attr('multiple', 'multiple');
    }

    if (input.change) {
        $select.on('change', input.change).change();
    }

    return $select;
}

function create_param_message(query) {
    return "<div class='message'>"+query.message+"</div>";
}

function create_param_default_value(query, key) {

    if (typeof query.defaultValue == 'undefined') {
        return '';
    }

    var title = query.defaultValue;

    if (query.defaultValue != '') {
        title = "<i class='icon-chevron-left'></i>"+ title;
    }
    var $a = $("<a href='#" +  key + "' />").data('value', query.defaultValue).html(title);

    $a.on('click', function () {
        $("input[name="+key+"]").val($(this).data('value'));
    })

    return $a;
}

function make_param (o) {
    var param = {
        index: o.index,
        url : o.url,
        data : make_data(o)
    };

    return param;
}

function make_data (o) {
    var data = {};
    var query = o.query || [];


    for(var i = 0, len = query.length; i < len; i++) {
        var param = query[i];

        var $input = $("[name="+param.key+"]");

        if ($input.attr('type') == 'hidden') {
            var timestamp = 0;

            var $date = $("[name="+param.key+"_date]");

            var dateStr = [$date.val()].join(" ");

            if ($.trim(dateStr)) {
                timestamp =  moment(dateStr, 'YYYY-MM-DDThh:mm').zone(window.server.minuteOffset).valueOf();
            }

            data[param.key] = timestamp;
        } else {
            var result = $input.val() || "";

            if (result != '') {

                if ($.isArray(result)) {
                    data[param.key] = result.join(",");
                } else {
                    data[param.key] = result;
                }

            }

        }

    }

    return data;
}

function get_api_query() {
    var $api = $("#api");
    var index = +$api.val();
    var o = api_list[index];
    o.index = index;

    var param = make_param(o);

    var ext = '';
    var type = $("#data-type").val();
    if (type !== 'json') {
        ext = '.' + type;
    }

    var list = [param.url + ext];

    var query = [];

    for(var key in param.data) {

        if (param.data[key] != '') {

            if ($.isArray(param.data[key])) {
                var arr = param.data[key];

                for(var i = 0, len = arr.length; i < len; i++) {
                    var field = [key, encodeURIComponent(arr[i])].join("=");

                    query.push(field);
                }

            } else {
                var field = [key, encodeURIComponent(param.data[key])].join("=");

                query.push(field);
            }

        }
    }

    if (query.length > 0) {
        list.push(query.join("&"));
    }

    $("#query-list #api-string").val(list.join("?"));
}

function beautifier(data) {
    var $data = $(data);
    var arr = [];
    $data.children().each(function () {
        var $li = $("<li />").html("&lt;" + this.nodeName + "&gt;");

        var children = $(this).children();

        if (children.length ) {
            $li.append(beautifier($(this)));
        } else {
            $li.append("<strong>" + $(this).text() + "</strong>");
        }

        $li.append("&lt;/" + this.nodeName + "&gt;");

        arr.push($li);
    });

    return $('<ul />').html(arr);
}

function api_fetch (param) {
    jennifer.ui.showLoading();
    var ext = '';
    var type = $("#data-type").val();
    if (type !== 'json') {
        ext = '.' + type;
    }
    $.ajax({
        method : param.method || 'GET',
        url : param.url + ext,
        data : param.data || {},
        success : function  (data, res, xhr) {
            if (type == 'xml') {
                var code = beautifier(data);
                $("#data-format").data('index', param.index);
                $("#data-format pre").html(code);
                $("#data-table div").data('done', false);
                //convert_table();
            } else if (type == 'txt') {
                $("#data-format").data('index', param.index);
                $("#data-format pre").html('');
                $("#data-table .content").html("<pre>" +  data + "</pre>");
                $("#data-table div").data('done', false);
            } else {
                var code = JSON.stringify(data, null, 4);
                $("#data-format").data('index', param.index);
                $("#data-format pre").html(code);
                $("#data-table div").data('done', false);
                convert_table();
            }

            jennifer.ui.closeLoading();
        },
        error : function (res) {
            jennifer.ui.closeLoading();
            parse_error(res.responseText);
        }
    })
}

function parse_error(message) {
    for(var i = 0, len = ERROR_MESSAGE.length ; i < len; i++) {
        var error = ERROR_MESSAGE[i];
        var index = message.indexOf(error);
        if (index > 0) {
            var startIndex = message.lastIndexOf(":", index);
            var endIndex = message.indexOf("\n", message.indexOf("\n", index+1)+1);
            alert(message.substring(startIndex+1, endIndex));
            break;
        }
    }
}

function convert_table() {

    if ($("#data-table div").data('done')) {
        return;
    }

    var index = parseInt($("#data-format").data('index'));
    var o =  api_list[index];

    var html = $.trim($("#data-format pre").html());

    if (html == "") {
        return;
    }

    var data = JSON.parse(html);

    var list = data[o.tableKeyField];

    if (!list ) { list = []; }


    var convertData = '';

    if (o.convert) {
        var result = o.convert(list, data);
        convertData = result;
    }

    var render = o.render;

    if (list[0]) {
        var keyFieldObject = list[0];
        var keys = [];

        for(var key in keyFieldObject) {
            keys.push(key);
        }

        var $table = $("<table class='simple table hover'></table>");
        var $thead = $("<thead />");
        var $tbody = $("<tbody />");

        $table.append($thead).append($tbody);

        var $tr = $("<tr />");
        for(var i = 0, len = keys.length; i < len; i++) {
            $tr.append("<th title='"+keys[i]+"'>" + keys[i] + "</th>");
        }

        $thead.append($tr);


        var dataLength = list.length;
        $(".table-count").text("(" + dataLength + ")");
        for(var dataIndex = 0; dataIndex < dataLength; dataIndex++) {
            var $tr = $("<tr />");

            for(var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                var value = list[dataIndex][key];

                if(render && render[key]) {
                    $tr.append($("<td />").html(render[key].call(null, value)));
                } else {
                    $tr.append($("<td />").html(value));
                }

            }

            $tbody.append($tr);
        }

        convertData = $table;
    }

    $("#data-table div").html(convertData).data('done', true);

}

function init_settings () {
    $("#parameter-list").empty();
    $("#data-format pre").empty();
    $("#data-table div").empty();
    $("#data-table div").data('done', false);
}

jui.ready(['ui.tab'], function(tab) {
    var $api = $("#api");
    var $run = $("#run");


    $api.empty();
    for(var i = 0, len = api_list.length; i < len; i++) {
        var o = api_list[i];
        var $options = $("<option />").text(o.title).val(i).data('index', i);

        $api.append($options);
    }
    $api.on('change', function () {

        init_settings();

        $.getJSON('/api/domain', function (domain) {
            set_params({
                domain : domain.domain
            });

            get_api_query();
        })
    });

    $("#data-type").on('change', function () {
        $("#data-format-name").html($(this).find("option:selected").text());
    })

    /////////////////////////////////////////
    $run.on('click', function () {
        var value = $api.val();

        if (value == '') {
            alert('API를 선택해주세요.');
            return;
        }


        var index = +$api.val();
        var o = api_list[index];
        o.index = index;

        api_fetch(make_param(o));
    });

    $('body').on('change', '.param,.date,.time', function () {
        get_api_query();
    });

    $("#contents #splitter").on('mousedown', function () {
        var $self = $(this);
        var $dataFormat = $("#data-format");
        var $dataTable = $("#data-table");

        function mouseMove(e) {
            $self.css('left' , (e.clientX+1) + 'px');
            $dataTable.css('left' , (e.clientX+1) + 'px');

            $dataFormat.width(e.clientX - parseFloat($dataFormat.offset().left));
        }

        function mouseUp() {
            $(document).off('mousemove', mouseMove);
            $(document).off('mouseup', mouseUp);
        }

        $(document).on('mousemove', mouseMove);
        $(document).on('mouseup', mouseUp);

    })
});