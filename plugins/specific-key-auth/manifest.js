module.exports = {
    version: "1.0.0",
    init: (pluginContext) => {
      pluginContext.registerPolicy(
        require("./policies/specific-key-auth.policy")
      );
    },
    policies: ["specific-key-auth"],
    schema: {
      $id: "N/A",
    },
  };
  