import { DatePicker, GetProp } from "antd";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { TimeOutlined } from "@/components/ExtraIcons";
import styles from "./DateFilter.module.scss";
import { isValidDateFormat } from "@/utils/common";
interface DateFilterProps {
    change: (dateString: [string, string]) => void;
    defaultValue:string[]
}

type RangePickerOnChangeType = GetProp<typeof DatePicker.RangePicker, 'onChange'>;

const { RangePicker } = DatePicker;
const DateFilter = ({ change, defaultValue}: DateFilterProps) => {

    const getDefaultValue = ():[dayjs.Dayjs, dayjs.Dayjs] =>{
        if(Array.isArray(defaultValue) && isValidDateFormat(defaultValue[0]) && isValidDateFormat(defaultValue[1])) {
          return [dayjs(defaultValue[0]),dayjs(defaultValue[1])]
        } else {
          return [dayjs(),dayjs().add(1,'month')]
        }
    }
    const minDate = dayjs();
    const onDateRangeChange: RangePickerOnChangeType= (_,dateStrings) => {
          change(dateStrings);
        //发送数据请求
    };
    return (
        <div className={styles.dateFilterWrapper}>

            <RangePicker
                variant="filled"
                allowClear={false}
                className={styles.dateFilter}
                onChange={onDateRangeChange}
                placeholder={["", ""]}
                minDate={minDate}
                defaultValue={getDefaultValue()}
            />
        </div>
    );
};

export default DateFilter;
