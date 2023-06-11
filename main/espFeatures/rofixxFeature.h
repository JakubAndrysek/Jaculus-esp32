#pragma once

#include <jac/machine/machine.h>
#include <jac/machine/functionFactory.h>

#include <stdexcept>
#include <set>
#include <unordered_map>



template<class Next>
class RofiFeature : public Next {
    class Rofi {
        int velocity;
    public:

        void setVelocity(float velocity) {
            this->velocity = velocity;
            printf("velocity: %f\n", velocity);
        }

        float getVelocity() {
            printf("velocity: %f\n", this->velocity);
            return this->velocity;
        }

        ~Rofi() {}
    };
public:
    Rofi rofi;

    void initialize() {
        Next::initialize();

        jac::FunctionFactory ff(this->context());

        jac::Module& ledcModule = this->newModule("rofi");
        // ledcModule.addExport("configureTimer", ff.newFunctionVariadic([this](std::vector<jac::ValueWeak> args) {
        //     if (args.size() < 2) {
        //         throw std::runtime_error("Expected at least 2 arguments");
        //     }
        //     int timerNum = args[0].to<int>();
        //     int frequency = args[1].to<int>();
        //     int resolution = 10;
        //     if (args.size() == 3) {
        //         resolution = args[2].to<int>();
        //     }

        //     this->rofi.configureTimer(timerNum, frequency, resolution);
        // }));
        // ledcModule.addExport("configureChannel", ff.newFunction(noal::function(&Rofi::configureChannel, &rofi)));
        // ledcModule.addExport("setFrequency", ff.newFunction(noal::function(&Rofi::setFrequency, &rofi)));
        ledcModule.addExport("setVelocity", ff.newFunction(noal::function(&Rofi::setVelocity, &rofi)));
        ledcModule.addExport("getVelocity", ff.newFunction(noal::function(&Rofi::getVelocity, &rofi)));
        ledcModule.addExport("setSpeed", ff.newFunction(noal::function(&Rofi::setSpeed, &rofi)));
    }
};
