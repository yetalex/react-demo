import LinePlot from '../../components/d3/LinePlot.tsx';

export const d3Example = () => {
  return (
    <div style={{border: '1px solid #ccc'}}>
      <LinePlot data={[1, 2, 3, 4, 5]} width={500} height={300} marginTop={20} marginRight={20} marginBottom={20} marginLeft={20} />
    </div>
  )
}