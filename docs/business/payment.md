# Payment System

## Tổng quan

Đây là hệ thống thanh toán cho hệ thống bán hàng online. Xây dựng để thực hiện các thao tác thanh toán, hoàn trả, và các
thao tác liên quan.

## Mục đích thực hiện

- Mô phỏng một hệ thống thanh toán đơn giản.
- Kết nối với ecommerce system hiện có để thực hiện thanh toán.

## Các chức năng

- Account:
    - Tạo account mới đi kèm với balance.
    - Bind account với ecommerce account.
- Payment:
    - Thực hiện thanh toán.
    - Hoàn trả.
    - Rút tiền.
    - Nạp tiền.
    - Lịch sử giao dịch.

## Cách thức hoạt động

Trong hệ thống thanh toán, chúng ta sẽ sử dụng mô hình tài khoản tổng để quản lý số dư của người dùng.

**Mô hình tài khoản tổng**

- Tài khoản tổng: Là tài khoản trung tâm, được dùng để quản lý toàn bộ số dư của hệ thống. Tất cả các giao dịch nạp
  tiền, thanh toán, hoặc hoàn tiền đều thực hiện thông qua tài khoản tổng.
- Tài khoản người dùng: Mỗi người dùng có một tài khoản riêng biệt để lưu trữ số dư của họ. Số dư này chỉ là dữ liệu
  logic trong hệ thống và không được trực tiếp chuyển sang tài khoản ngân hàng thực tế.

**Luồng giao dịch**

1. **Nạp tiền:**
    - Người dùng nạp tiền từ tài khoản ngân hàng vào tài khoản hệ thống.
    - Tiền được ghi nhận vào tài khoản tổng, và số dư logic của người dùng được tăng lên tương ứng.
2. **Thanh toán:**
    - Khi người dùng thanh toán đơn hàng, tiền được chuyển từ tài khoản của họ sang tài khoản logic của cửa hàng.
    - Tài khoản tổng vẫn giữ số dư thật, nhưng hệ thống quản lý thay đổi logic của các tài khoản.
3. **Hoàn tiền:**
   - Khi có yêu cầu hoàn tiền, số tiền sẽ được chuyển từ tài khoản cửa hàng về tài khoản người dùng.
   - Tài khoản tổng không cần thực hiện giao dịch thực tế nếu tiền vẫn nằm trong tài khoản tổng.
4. **Rút tiền:**
   - Người dùng có thể rút tiền từ tài khoản hệ thống về tài khoản ngân hàng của họ.
   - Số tiền sẽ được chuyển từ tài khoản tổng sang tài khoản người dùng.

**Ví dụ:**

- Nạp tiền:
  - Người dùng A nạp 100.000 VNĐ.
  - Tài khoản tổng nhận 100.000 VNĐ.
  - Số dư logic của A tăng lên 100.000 VNĐ.
- Thanh toán:
  - Người dùng A thanh toán 50.000 VNĐ.
  - Số dư tài khoản logic của A giảm 50.000 VNĐ, số dư tài khoản cửa hàng tăng 50.000 VNĐ.
  - Tài khoản tổng không thay đổi.
- Hoàn tiền:
  - Người dùng A yêu cầu hoàn tiền 50.000 VNĐ.
  - Số dư tài khoản logic của A tăng 50.000 VNĐ, số dư tài khoản cửa hàng giảm 50.000 VNĐ.
  - Tài khoản tổng không thay đổi.
- Rút tiền:
  - Người dùng A rút 50.000 VNĐ.
  - Số dư tài khoản logic của A giảm 50.000 VNĐ.
  - Tài khoản tổng giảm 50.000 VNĐ.

## Ưu điểm của tài khoản tổng

- Kiểm soát dòng tiền:
  - Tiền luôn nằm trong hệ thống, giảm rủi ro liên quan đến thất thoát tiền.
- Giảm chi phí giao dịch ngân hàng:
  - Các giao dịch giữa tài khoản người dùng và cửa hàng là logic, không thực hiện qua ngân hàng.
- Quản lý tập trung:
  - Hệ thống chỉ cần kiểm soát một tài khoản tổng, đơn giản hóa việc đối chiếu số dư.

## Triển khai

Vui lòng xem chi tiết trong payment service.

## Tham khảo

- [Stripe](https://stripe.com/)
- [Paypal](https://www.paypal.com/)
- [Momo](https://momo.vn/)
- [ZaloPay](https://zalopay.vn/)