package com.example.apinext.model.enums;

public enum EStatus {
    CONFIRMING(1L,"Chờ xác nhận"),
    INTRANSIT(2L,"Đang vận chuyển"),
    PAID(3L,"Đã thanh toán"),
    CANCEL(4L,"Đã huỷ");
    private final Long id;
    private final String status;
    EStatus(Long id, String status) {
        this.id = id;
        this.status = status;
    }
    public static EStatus getStatusById(Long idIn){
        for (EStatus eStatus : EStatus.values()) {
            if (eStatus.id.equals(idIn)) {
                return eStatus;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy Status này");
    }
    public static EStatus getByStatus(String status) {
        for (EStatus eStatus : EStatus.values()) {
            if (eStatus.status.equals(status)) {
                return eStatus;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy Status này");
    }
}
