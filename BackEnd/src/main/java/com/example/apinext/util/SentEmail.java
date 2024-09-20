package com.example.apinext.util;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SentEmail {


    public static String OrderSuccessful(String name , LocalDate date, Integer totalProduct, BigDecimal Subtotal) {
        return "Xin chào " + name + ",\n\n"
                + "Cảm ơn bạn đã tin tưởng chọn và ủng hộ hệ thống của chúng tôi.\n"
                + "Vào ngày " + date + " bạn đã đặt thành công đơn hàng của mình với " + totalProduct + " sản phẩm với tổng tiền là " + Subtotal +" $.\n"
                + "Bạn có thể xem và kiểm ta đơn hàng tại lịch sử đơn hàng để biết thêm thông tin chi tiết.\n"
                + "Nếu có bất cứ thắc mắc nào Vui lòng phản hồi qua email này cho đội ngũ của chúng tôi." + "\n"
                + "Cảm ơn bạn đã dành thời gian để đọc Email này.\n\n"
                + "Trân trọng !";
    }

    public static String DeliverySuccessful(String name) {
        return "Xin chào " + name + ",\n\n"
                + "Đơn hàng của bạn đã được giao thành công.\n"
                + "Cảm ơn bạn đã tin tưởng chọn và ủng hộ hệ thống của chúng tôi.\n"
                + "Nếu có bất cứ thắc mắc nào Vui lòng phản hồi qua email này cho đội ngũ của chúng tôi." + "\n"
                + "Cảm ơn bạn đã dành thời gian để đọc Email này.\n\n"
                + "Trân trọng !";
    }
}
