## Getting started

You must modify the configuration file of the view server. (conf/server_view.conf)
```
plugin_class_path = ${PLUGIN_PROJECT_PATH}/dist/jennifer-view-plugin-guid-1.0.0.jar
```

After modifying the configuration file, you must restart the view server.


## How to use

If you need to search directly when loading the screen, you can use the following url.
```
/plugin/guid?guid=5&stime=20170209000000&etime=20170209010000&time_pattern=yyyyMMddhhmmss
```

If you need to load the screen in an iframe, you can use the following url.
```
/plugin/guid?layout=iframe
```
