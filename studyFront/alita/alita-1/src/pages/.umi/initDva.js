import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'home', ...(require('D:/git-fontDemo/studyFront/alita/alita-1/src/models/home.js').default) });
app.model({ namespace: 'index', ...(require('D:/git-fontDemo/studyFront/alita/alita-1/src/models/index.js').default) });
app.model({ namespace: 'list', ...(require('D:/git-fontDemo/studyFront/alita/alita-1/src/models/list.js').default) });
