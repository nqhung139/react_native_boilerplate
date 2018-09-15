import Reactotron, {
  networking,
  openInEditor,
  trackGlobalErrors as errorPlugin,
} from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import * as sagaPlugin from 'reactotron-redux-saga'
import DebugConfig from './DebugConfig'

if (DebugConfig.useReactotron) {
  console.tron = Reactotron.log

  Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(
      errorPlugin({
        // ignore all error frames from react-native (for example)
        veto: (frame: any) =>
          frame.fileName.indexOf('/node_modules/react-native/') >= 0,
      }),
    )
    .use(networking())
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(openInEditor())
    .connect() // let's connect!
  Reactotron.clear()
} else {
  console.tron = () => null
}
