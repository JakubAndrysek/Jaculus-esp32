#pragma once

#include <jac/machine/machine.h>
#include <jac/machine/functionFactory.h>
#include <jac/machine/class.h>

#include <noal_func.h>
#include <memory>
#include <unordered_map>
#include "../rofi/rofi_hal.hpp"

#include <set>


// template<>
// struct jac::ConvTraits<Rgb> {
//     static Value to(ContextRef ctx, Rgb val) {
//         auto obj = Object::create(ctx);
//         obj.set<int>("r", val.r);
//         obj.set<int>("g", val.g);
//         obj.set<int>("b", val.b);
//         return obj;
//     }

//     static Rgb from(ContextRef ctx, ValueWeak val) {
//         auto obj = val.to<Object>();
//         return Rgb(obj.get<int>("r"), obj.get<int>("g"), obj.get<int>("b"));
//     }
// };


template<class Next>
class RofiFeature : public Next {
    // static inline std::set<int> _usedRmtChannels;

    struct RofiJointProtoBuilder : public jac::ProtoBuilder::Opaque<rofi::hal::Joint>, public jac::ProtoBuilder::Properties {
        static rofi::hal::Joint* constructOpaque(JSContext* ctx, std::vector<jac::ValueWeak> args) {
            // if (args.size() != 2) {
            //     throw std::runtime_error("Invalid number of arguments");
            // }
            // int pin = args[0].to<int>();
            // int count = args[1].to<int>();

            // if (Next::PlatformInfo::PinConfig::DIGITAL_PINS.find(pin) == Next::PlatformInfo::PinConfig::DIGITAL_PINS.end()) {
            //     throw std::runtime_error("Invalid pin number");
            // }

            // int channel = 0;
            // while (_usedRmtChannels.find(channel) != _usedRmtChannels.end()) {
            //     channel++;
            // }
            // if (channel >= 4) {
            //     throw std::runtime_error("No available RMT channels");
            // }
            // _usedRmtChannels.insert(channel);
			printf("rofi::hal::Joint constructor\n");

            return new rofi::hal::Joint();
        }

        static void destroyOpaque(JSRuntime* rt, rofi::hal::Joint* ptr) noexcept {
            if (!ptr) {
                return;
            }
            delete ptr;
        }

        static void addProperties(JSContext* ctx, jac::Object proto) {
            jac::FunctionFactory ff(ctx);

            proto.defineProperty("setVelocity", ff.newFunctionThis([](jac::ContextRef ctx, jac::ValueWeak thisValue, double velocity) {
                rofi::hal::Joint& joint = *getOpaque(ctx, thisValue);
                joint.setVelocity(velocity);
            }), jac::PropFlags::Enumerable);


            proto.defineProperty("getVelocity", ff.newFunctionThis([](jac::ContextRef ctx, jac::ValueWeak thisValue) {
                rofi::hal::Joint& joint = *getOpaque(ctx, thisValue);
                return joint.getVelocity();
            }), jac::PropFlags::Enumerable);
        }
    };

    struct RofiConnectorProtoBuilder : public jac::ProtoBuilder::Opaque<rofi::hal::Connector>, public jac::ProtoBuilder::Properties {
        static rofi::hal::Connector* constructOpaque(JSContext* ctx, std::vector<jac::ValueWeak> args) {
            // if (args.size() != 2) {
            //     throw std::runtime_error("Invalid number of arguments");
            // }
            // int pin = args[0].to<int>();
            // int count = args[1].to<int>();

            // if (Next::PlatformInfo::PinConfig::DIGITAL_PINS.find(pin) == Next::PlatformInfo::PinConfig::DIGITAL_PINS.end()) {
            //     throw std::runtime_error("Invalid pin number");
            // }

            // int channel = 0;
            // while (_usedRmtChannels.find(channel) != _usedRmtChannels.end()) {
            //     channel++;
            // }
            // if (channel >= 4) {
            //     throw std::runtime_error("No available RMT channels");
            // }
            // _usedRmtChannels.insert(channel);
			printf("rofi::hal::Connector constructor\n");

            return new rofi::hal::Connector();
        }

        static void destroyOpaque(JSRuntime* rt, rofi::hal::Connector* ptr) noexcept {
            if (!ptr) {
                return;
            }
            delete ptr;
        }

        static void addProperties(JSContext* ctx, jac::Object proto) {
            jac::FunctionFactory ff(ctx);

            proto.defineProperty("connect", ff.newFunctionThis([](jac::ContextRef ctx, jac::ValueWeak thisValue) {
                rofi::hal::Connector& connector = *getOpaque(ctx, thisValue);
                connector.connect();
            }), jac::PropFlags::Enumerable);


            proto.defineProperty("disconnect", ff.newFunctionThis([](jac::ContextRef ctx, jac::ValueWeak thisValue) {
                rofi::hal::Connector& connector = *getOpaque(ctx, thisValue);
                return connector.disconnect();
            }), jac::PropFlags::Enumerable);
        }
    };




public:
    using RofiJointClass = jac::Class<RofiJointProtoBuilder>;
    using RofiConnectorClass = jac::Class<RofiConnectorProtoBuilder>;

    RofiFeature() {
        RofiJointClass::init("Joint");
        RofiConnectorClass::init("Connector");
    }

    void initialize() {
        Next::initialize();

        auto& mod = this->newModule("rofi");
        jac::Function joint = RofiJointClass::getConstructor(this->context());
        mod.addExport("Joint", joint);

        jac::Function connector = RofiConnectorClass::getConstructor(this->context());
        mod.addExport("Connector", connector);
    }
};
