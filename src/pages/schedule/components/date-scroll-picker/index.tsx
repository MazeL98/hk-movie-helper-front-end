import { useState,useContext,useEffect } from 'react';
import {Button } from "antd";
import { ScrollMenu, VisibilityContext,publicApiType  } from 'react-horizontal-scrolling-menu';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styles from "./DateScrollPicker.module.scss"

dayjs.extend(isSameOrBefore);
dayjs.locale("zh-cn");



interface DateScrollPickerProps {
  onChange: (date: Dayjs) => void,
  value: string,
  dates:string[]
}

interface DateItemProps {
  date:Dayjs,
  selected: boolean,
  itemId: string,
  onclick: (date: Dayjs) => void
}

// 左箭头组件
const LeftArrow = () =>{
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
  return (
    <Button 
    variant='link'
      icon={<LeftOutlined />} 
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      className={styles.leftArrow}
    />
  );
}

// 右箭头组件
const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  return (
    <Button 
    variant='link'
      icon={<RightOutlined />} 
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      className={styles.rightArrow}
    />
  );
};

// 日期项
const DateItem = ({date,selected,itemId,onclick}:DateItemProps) => {
  // const visibility = useContext(VisibilityContext)
  // const isVisible = visibility.isItemVisible(itemId)

  return (
    <div onClick={() => onclick(date)} style={{
      width: '60px',
      height: '64px',
      margin: '0 6px',
      display: 'flex',
      flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor: selected ? '#edcf5d' : '#f0f0f0',
        color:  '#010101',
        userSelect: 'none'
    }}>
      <div style={{ lineHeight: '1.2',fontSize: '12px' }}>{date.format('M') + '月'}</div>
      <div style={{ lineHeight: '1.3',fontSize: '18px', fontWeight: 'bold' }}>{date.format('DD')}</div>
            <div style={{lineHeight: '1.2',fontSize: '12px' }}>{date.format('ddd')}</div>

    </div>
  )
}


// 日期滚动选择器
const DateScrollPicker = ({onChange,value,dates}: DateScrollPickerProps) => {
  const [selectedDate,setSelectedDate ] = useState<Dayjs>()

  const [dateList,setDateList] = useState<Dayjs[]>([])

  useEffect(() =>{
    setDateList(() => dates.map(item => dayjs(item)))
  },[dates])

  useEffect(() =>{
    setSelectedDate(dayjs(value))
  },[value])

  const handleDateClick = (date:Dayjs ) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  //TODO: 防抖 当已经移动到两端时不需要再执行
  const handleWheel = (VisibilityContext:publicApiType,event:React.WheelEvent) =>{
    event.stopPropagation();

    if(event.deltaY < 0 ){
      VisibilityContext.scrollPrev()
    } else if(!VisibilityContext.isLastItemVisible) {
      VisibilityContext.scrollNext()
    }
  }

  if(!dates || !dates.length) {
    return ""
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} wrapperClassName={styles.dateScroller}
    scrollContainerClassName="date-scroll-container"  onWheel={(context,ev:React.WheelEvent)=> handleWheel(context,ev)}>
      {dateList.map(date => (
        <DateItem key={date.format('YYYY-MM-DD')} date={date} itemId={date.format('YYYY-MM-DD')} selected={date.isSame(selectedDate,'day')} onclick={handleDateClick}></DateItem>
      ))}
    </ScrollMenu>
  )
}

export default DateScrollPicker