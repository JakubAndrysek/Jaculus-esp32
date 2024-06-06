#include <memory>
#include <esp_log.h>

#include <gridui.h>

#include "./builder/arm.h"
#include "./builder/bar.h"
#include "./builder/button.h"
#include "./builder/camera.h"
#include "./builder/checkbox.h"
#include "./builder/circle.h"
#include "./builder/input.h"
#include "./builder/joystick.h"
#include "./builder/led.h"
#include "./builder/orientation.h"
#include "./builder/select.h"
#include "./builder/slider.h"
#include "./builder/spinedit.h"
#include "./builder/switcher.h"
#include "./builder/text.h"

#include "./widgets/arm.h"
#include "./widgets/bar.h"
#include "./widgets/button.h"
#include "./widgets/camera.h"
#include "./widgets/checkbox.h"
#include "./widgets/circle.h"
#include "./widgets/input.h"
#include "./widgets/joystick.h"
#include "./widgets/led.h"
#include "./widgets/orientation.h"
#include "./widgets/select.h"
#include "./widgets/slider.h"
#include "./widgets/spinedit.h"
#include "./widgets/switcher.h"
#include "./widgets/text.h"

#include "gridUiFeature.h"

using namespace gridui_jac;

class GridUiBuilderProtoBuilder : public jac::ProtoBuilder::Opaque<GridUiHolder>, public jac::ProtoBuilder::Properties {
    friend class GridUiHolder;

    typedef jac::Object(*GetProtoT)(jac::ContextRef);

    template<WidgetTypeId typeId, typename BuilderT, typename WidgetT, GetProtoT getProtoWidget>
    static JSValue finish(JSContext* ctx_, JSValueConst thisVal, int argc, JSValueConst* argv) {
        auto& builder = *reinterpret_cast<BuilderT*>(JS_GetOpaque(thisVal, 1));

        auto widget = new WidgetT(std::move(builder.finish()));

        auto obj = GridUiContext::get().buildObj(ctx_, typeId, false, widget, getProtoWidget);
        return obj.loot().second;
    }

public:
    static void destroyOpaque(JSRuntime* rt, GridUiHolder* ptr) noexcept { }

    template<WidgetTypeId typeId, typename BuilderT, typename WidgetT, GetProtoT getProtoBuilder, GetProtoT getProtoWidget>
    static jac::Object builder(jac::ContextRef ctx, jac::ValueWeak thisVal, std::vector<jac::ValueWeak> args) {
        if (args.size() < 4) {
            throw jac::Exception::create(jac::Exception::Type::TypeError, "expected at least 4 arguments");
        }

        uint16_t uuid = 0;
        uint16_t tab = 0;
        if(args.size() >= 5) {
            uuid = args[4].to<uint16_t>();
        }
        if(args.size() >= 6) {
            tab = args[5].to<uint16_t>();
        }

        auto widget = gridui::UI.newWidget<BuilderT>(args[0].to<float>(), args[1].to<float>(), args[2].to<float>(), args[3].to<float>(), uuid, tab);

        auto obj = GridUiContext::get().buildObj(ctx, typeId, true, widget, [](jac::ContextRef ctx) {
            auto proto = getProtoBuilder(ctx);
            proto.set("finish", jac::Value(ctx, JS_NewCFunction(ctx, finish<typeId, BuilderT, WidgetT, getProtoWidget>, "finish", 0)));
            return proto;
        });

        return obj;
    }

    static void addProperties(JSContext* ctx, jac::Object proto) {
        jac::FunctionFactory ff(ctx);

        proto.defineProperty("arm", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Arm, gridui::builder::Arm, gridui::Arm, ArmBuilder::proto, ArmWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("bar", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Bar, gridui::builder::Bar, gridui::Bar, BarBuilder::proto, BarWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("button", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Button, gridui::builder::Button, gridui::Button, ButtonBuilder::proto, ButtonWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("camera", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Camera, gridui::builder::Camera, gridui::Camera, CameraBuilder::proto, CameraWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("checkbox", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Checkbox, gridui::builder::Checkbox, gridui::Checkbox, CheckboxBuilder::proto, CheckboxWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("circle", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Circle, gridui::builder::Circle, gridui::Circle, CircleBuilder::proto, CircleWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("input", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Input, gridui::builder::Input, gridui::Input, InputBuilder::proto, InputWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("joystick", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Joystick, gridui::builder::Joystick, gridui::Joystick, JoystickBuilder::proto, JoystickWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("led", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Led, gridui::builder::Led, gridui::Led, LedBuilder::proto, LedWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("orientation", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Orientation, gridui::builder::Orientation, gridui::Orientation, OrientationBuilder::proto, OrientationWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("select", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Select, gridui::builder::Select, gridui::Select, SelectBuilder::proto, SelectWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("slider", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Slider, gridui::builder::Slider, gridui::Slider, SliderBuilder::proto, SliderWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("spinEdit", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::SpinEdit, gridui::builder::SpinEdit, gridui::SpinEdit, SpinEditBuilder::proto, SpinEditWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("switcher", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Switcher, gridui::builder::Switcher, gridui::Switcher, SwitcherBuilder::proto, SwitcherWidget::proto>)), jac::PropFlags::Enumerable);
        proto.defineProperty("text", ff.newFunctionThisVariadic(std::function(&builder<WidgetTypeId::Text, gridui::builder::Text, gridui::Text, TextBuilder::proto, TextWidget::proto>)), jac::PropFlags::Enumerable);
    }
};

void GridUiHolder::defaultOnPacketReceived(const std::string& cmd, rbjson::Object* pkt) {
    // Let GridUI handle its packets
    if (gridui::UI.handleRbPacket(cmd, pkt))
        return;
    // ignore the rest
}

void GridUiHolder::begin(jac::ContextRef context, std::string ownerName, std::string deviceName, jac::Function builderCallback) {
    using namespace gridui;
    if(_webServerTask) {
        throw jac::Exception::create(jac::Exception::Type::Error, "gridui.begin was already called");
    }

    jac::Class<GridUiBuilderProtoBuilder>::init("guiBuilder");

    // Start serving the web page
    _webServerTask = rb_web_start_no_spiffs(80, "/data");
    if(_webServerTask == NULL) {
        throw jac::Exception::create(jac::Exception::Type::InternalError, "failed to call rb_web_start_no_spiffs");
    }

    rb_web_set_not_found_callback(gridui::webserverNotFoundCallback);

    _protocol.reset(new rb::Protocol("FrantaFlinta", "Jaculus-test", "Compiled at " __DATE__ " " __TIME__, defaultOnPacketReceived));
    _protocol->start();

    UI.begin(_protocol.get());
    builderCallback.call<void>(jac::Class<GridUiBuilderProtoBuilder>::createInstance(context, this));
    GridUiContext::get().clearProtos();
    UI.commit();
}

void GridUiHolder::end() {
    if(!_webServerTask) {
        return;
    }

    gridui::UI.end();
    GridUiContext::get().clear();

    rb_web_stop(_webServerTask);
    _webServerTask = nullptr;

    if(_protocol) {
        _protocol->stop();
    }
}
