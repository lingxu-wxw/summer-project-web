package com.sjtubus.service;

import com.sjtubus.dao.*;
import com.sjtubus.entity.*;
import com.sjtubus.utils.StringCalendarUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class RideBusInfoService {
    @Autowired
    RideBusInfoDao rideBusInfoDao;
    @Autowired
    ShiftDao shiftDao;
    @Autowired
    AppointmentDao appointmentDao;
    @Autowired
    UserDao userDao;
    @Autowired
    JaccountUserDao jaccountUserDao;

    /**
     * @description: 管理员录入发车信息
     * @date: 2018/9/6 16:47
     * @params: 管理员输入的所有参数
     * @return: [String] success:"success"
    */
    public String addRideBusInfo(String ride_date, String shift_id,
                                 String bus_id, String line_type,
                                 int teacher_num, int student_num,
                                 int remain_num, int seat_num){
        RideBusInfo rideBusInfo = new RideBusInfo();
        Date date = new Date(StringCalendarUtils.StringToDate(ride_date).getTime());
        rideBusInfo.setRideDate(date);
        rideBusInfo.setBusId(bus_id);
        rideBusInfo.setShiftId(shift_id);
        rideBusInfo.setLine_type(line_type);
        rideBusInfo.setSeatNum(seat_num);
        rideBusInfo.setStudentNum(student_num);
        rideBusInfo.setTeacherNum(teacher_num);
        //获取Shift信息
        Shift shift = shiftDao.findByShiftId(shift_id);
        if(shift==null) return "shift=null";
        rideBusInfo.setReserveSeat(shift.getReserveSeat());
        rideBusInfo.setAppointNum(shift.getReserveSeat()-remain_num);
        //查找违约名单并减10分
        List<Appointment> appointments = appointmentDao.findByShiftIdAndAppointDateAndIsNormal(shift_id,date,false);
        rideBusInfo.setAppointBreak(appointments.size());
        for(Appointment appointment:appointments) {
            if(appointment.getUserRole().equals("user")){
                User user = userDao.findByUsername(appointment.getUserName());
                if(user!=null){
                    user.setCredit(user.getCredit()-10);
                    userDao.save(user);
                }
            }else if (appointment.getUserRole().equals("jaccountuser")){
                JaccountUser jaccountUser = jaccountUserDao.findByUsername(appointment.getUserName());
                if(jaccountUser!=null) {
                    jaccountUser.setCredit(jaccountUser.getCredit() - 10);
                    jaccountUserDao.save(jaccountUser);
                }
            }
        }
        RideBusInfo info = rideBusInfoDao.save(rideBusInfo);
        return "success";
    }
}
