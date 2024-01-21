type IndexItemProp = {
  id: string;
  label: string;
  href: string;
  subitems?: IndexItemProp[];
};

export default IndexItemProp;
