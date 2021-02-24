import ProjectPlugin from "./ProjectPlugin";
import PluginTemplate from "./PluginTemplate";
import DamagePlugin from "./DamagePlugin"

const pluginDictionary = {
    project: ProjectPlugin,
    template: PluginTemplate,
    damage: DamagePlugin,
    // jeroen: PluginJeroen
    //   stg: StgPlugin
  };

export default pluginDictionary