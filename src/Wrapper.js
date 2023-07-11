import '@folio-eis/marva-next';


const Wrapper = (props) => {
  // TODO: manage & purge localStorage here

  return (
    <div id="editor-root" style={{ margin: '1em' }}>
      <marva-next route-prefix="/marva" okapi={JSON.stringify(props.stripes.okapi)} />
    </div>
  );
};

export default Wrapper;
