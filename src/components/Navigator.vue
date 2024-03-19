<script>
// const MENU_TYPE_SUBMENU = "el-submenu";
// const MENU_TYPE_MENU_ITEM_GROUP = "el-menu-item-group";
// const MENU_TYPE_MENU_ITEM = "el-menu-item";

function renderNavi(h, items) {
  return (vm) => {
    return items.map((node) => {
      const element = node.type;
      const $title = h(
        "span",
        {
          ...(node.type !== "item" ? { slot: "title" } : {}),
        },
        [node.icon ? <iv-icon type={node.icon} /> : "", node.title]
      );
      return h(
        element,
        {
          props: {
            title: node.title,
            name: node.name,
            index: node.path,
          },
        },
        [$title, node.children ? renderNavi(h, node.children)(vm) : ""]
      );
    });
  };
}

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: "vertical",
    },
    active: {
      type: String,
      default: "",
    },
    openeds: {
      type: Array,
      default: () => [],
    },
  },
  render(h) {
    return h(
      "el-menu",
      {
        ref: "menu",
        props: {
          mode: this.mode,
          "default-active": this.active,
          "default-openeds": this.openeds,
        },
        // class: "adm-navi",
        on: {
          select: (name) => {
            this.onSelect(name);
          },
        },
      },
      [h("div", this.$slots.logo), renderNavi(h, this.data)(this)]
    );
  },
  methods: {
    onSelect(index){
      console.log(index)
      this.$emit("select", index);
    },
  }
};
</script>
