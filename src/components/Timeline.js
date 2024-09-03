const TimelineItem = ({ year, title, description }) => (
    <div className="flex mb-8">
      <div className="flex flex-col items-center mr-4">
        <div className="w-1 h-full bg-primary"></div>
        <div className="w-4 h-4 rounded-full bg-primary"></div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{year}</p>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
  
  const Timeline = ({ items }) => (
    <div className="mt-8">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  )
  
  export default Timeline;